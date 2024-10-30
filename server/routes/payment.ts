import { Router } from 'express';
import { z } from 'zod';
import Stripe from 'stripe';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import prisma from '../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const router = Router();

const createCheckoutSchema = z.object({
  quantity: z.number().min(1).max(100),
});

router.post(
  '/create-checkout-session',
  authenticate,
  validateRequest(createCheckoutSchema),
  async (req, res) => {
    try {
      const { quantity } = req.body;
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.TOKEN_PRICE_ID,
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment/cancel`,
        metadata: {
          userId: user.id,
          tokenQuantity: quantity.toString(),
        },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error('Payment session creation failed:', error);
      res.status(500).json({ error: 'Failed to create payment session' });
    }
  }
);

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']!;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tokenQuantity = parseInt(session.metadata?.tokenQuantity || '0', 10);

      if (userId && tokenQuantity) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            tokens: {
              increment: tokenQuantity,
            },
          },
        });
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export default router;