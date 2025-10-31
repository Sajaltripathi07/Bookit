import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const schema = z.object({ code: z.string().min(2) });

router.post('/validate', async (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: 'Invalid input' });
    const code = parsed.data.code.toUpperCase();
    const promo = await prisma.promoCode.findUnique({ where: { code } });
    if (!promo || !promo.active) return res.status(400).json({ valid: false, message: 'Invalid promo code' });

    res.json({ valid: true, type: promo.type, amountCents: promo.amountCents, percent: promo.percent });
  } catch (err) {
    next(err);
  }
});

export default router;


