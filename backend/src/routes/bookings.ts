import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const bookingSchema = z.object({
  experienceId: z.string().uuid(),
  slotId: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  promoCode: z.string().trim().optional(),
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid input', issues: parsed.error.flatten() });
    }
    const { experienceId, slotId, name, email, promoCode } = parsed.data;

    // Validate slot belongs to experience
    const slot = await prisma.slot.findFirst({ where: { id: slotId, experienceId }, include: { _count: { select: { bookings: true } } } });
    if (!slot) return res.status(404).json({ message: 'Slot not found for experience' });

    // Capacity check
    const remaining = slot.capacity - slot._count.bookings;
    if (remaining <= 0) return res.status(409).json({ message: 'Slot sold out' });

    // Promo validation (optional)
    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({ where: { code: promoCode.toUpperCase() } });
      if (!promo || !promo.active) return res.status(400).json({ message: 'Invalid promo code' });
    }

    // Create booking and prevent double booking (unique email per slot)
    const booking = await prisma.$transaction(async (tx) => {
      // Re-check capacity inside transaction
      const fresh = await tx.slot.findUnique({ where: { id: slotId }, include: { _count: { select: { bookings: true } } } });
      if (!fresh) throw new Error('Slot disappeared');
      if (fresh.capacity - fresh._count.bookings <= 0) throw new Error('SOLD_OUT');

      const created = await tx.booking.create({
        data: { experienceId, slotId, name, email: email.toLowerCase(), promoCode: promoCode?.toUpperCase() },
      });
      return created;
    });

    res.status(201).json({ id: booking.id, message: 'Booking confirmed' });
  } catch (err: any) {
    if (err instanceof z.ZodError) return res.status(400).json({ message: 'Invalid input', issues: err.flatten() });
    if (typeof err?.message === 'string' && err.message === 'SOLD_OUT') return res.status(409).json({ message: 'Slot sold out' });
    if ((err as Prisma.PrismaClientKnownRequestError)?.code === 'P2002') {
      return res.status(409).json({ message: 'You have already booked this slot' });
    }
    next(err);
  }
});

export default router;


