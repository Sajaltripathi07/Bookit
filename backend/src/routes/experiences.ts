import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /experiences -> list all experiences (basic fields + cover image)
router.get('/', async (_req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        priceCents: true,
        coverImageUrl: true,
        rating: true,
        createdAt: true,
      },
    });
    res.json(experiences);
  } catch (err) {
    next(err);
  }
});

// GET /experiences/:id -> details + available slots
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const experience = await prisma.experience.findUnique({
      where: { id },
      include: {
        slots: {
          orderBy: { startTime: 'asc' },
          include: {
            _count: { select: { bookings: true } },
          },
        },
      },
    });
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const slotsWithAvailability = experience.slots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      capacity: slot.capacity,
      booked: slot._count.bookings,
      available: Math.max(0, slot.capacity - slot._count.bookings),
    }));

    res.json({
      id: experience.id,
      title: experience.title,
      description: experience.description,
      experienceDetails: (experience as any).experienceDetails,
      location: experience.location,
      priceCents: experience.priceCents,
      coverImageUrl: experience.coverImageUrl,
      galleryImageUrls: experience.galleryImageUrls,
      rating: experience.rating,
      slots: slotsWithAvailability,
    });
  } catch (err) {
    next(err);
  }
});

export default router;


