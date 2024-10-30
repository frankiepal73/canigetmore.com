import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const salarySchema = z.object({
  body: z.object({
    role: z.string(),
    salary: z.number(),
    company: z.string(),
    location: z.string(),
    experience: z.number(),
    remote: z.boolean(),
    skills: z.array(z.string()),
  }),
});

const querySchema = z.object({
  query: z.object({
    role: z.string().optional(),
    location: z.string().optional(),
    minExperience: z.string().transform(Number).optional(),
    maxExperience: z.string().transform(Number).optional(),
  }),
});

router.post('/', authenticate, validateRequest(salarySchema), async (req, res, next) => {
  try {
    const salaryEntry = await prisma.salaryEntry.create({
      data: req.body,
    });
    res.json(salaryEntry);
  } catch (error) {
    next(error);
  }
});

router.get('/', validateRequest(querySchema), async (req, res, next) => {
  try {
    const { role, location, minExperience, maxExperience } = req.query;
    
    const where = {
      ...(role && { role }),
      ...(location && { location }),
      ...(minExperience && { experience: { gte: Number(minExperience) } }),
      ...(maxExperience && { experience: { lte: Number(maxExperience) } }),
    };

    const salaries = await prisma.salaryEntry.findMany({ where });
    res.json(salaries);
  } catch (error) {
    next(error);
  }
});

export default router;