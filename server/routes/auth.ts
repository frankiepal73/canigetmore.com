import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.string(),
    experience: z.number(),
    skills: z.array(z.string()),
    location: z.string(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const useTokenSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { email, password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        tokens: 3, // New users get 3 free tokens
        ...rest,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        experience: true,
        skills: true,
        location: true,
        tokens: true,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        experience: user.experience,
        skills: user.skills,
        location: user.location,
        tokens: user.tokens,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/use-token/:userId', validateRequest(useTokenSchema), async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.tokens <= 0) {
      return res.status(403).json({ error: 'No tokens available' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { tokens: user.tokens - 1 },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        experience: true,
        skills: true,
        location: true,
        tokens: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

export default router;