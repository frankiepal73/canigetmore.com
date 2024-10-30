import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const companySchema = z.object({
  body: z.object({
    name: z.string(),
    avgSalary: z.number(),
    employees: z.number(),
    growth: z.number(),
    location: z.string(),
  }),
});

router.post('/', authenticate, validateRequest(companySchema), async (req, res, next) => {
  try {
    const company = await prisma.company.create({
      data: req.body,
    });
    res.json(company);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { avgSalary: 'desc' },
      take: 10,
    });
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

export default router;