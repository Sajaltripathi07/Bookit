import { PrismaClient, PromoType } from '@prisma/client';

const prisma = new PrismaClient();

type SeedExperience = {
  title: string;
  description: string;
  experienceDetails?: string;
  location: string;
  priceCents: number;
  coverImageUrl: string;
  galleryImageUrls: string[];
  rating: number;
};

const experiences: SeedExperience[] = [
  {
    title: 'Sunset Kayaking Tour',
    description: 'Paddle into a golden sunset with an expert guide and small group.',
    experienceDetails: 'Launch from a sheltered cove and learn efficient strokes.\nGlide past sandstone cliffs as dolphins and seabirds appear.\nPause for photos while the horizon shifts through gold and pink.',
    location: 'San Diego, USA',
    priceCents: 7500,
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1523661149972-0becaca2016f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.8,
  },
  {
    title: 'Old City Walking Tour',
    description: 'Discover hidden alleys, street art, and local bites with a historian.',
    experienceDetails: 'Wander past azulejo-clad buildings and miradouros.\nSample a pastel de nata from a beloved local bakery.\nHear tales of sailors, spies, and fado traditions.',
    location: 'Lisbon, Portugal',
    priceCents: 4500,
    coverImageUrl: 'https://images.unsplash.com/photo-1544986581-efac024faf62?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.6,
  },
  {
    title: 'Northern Lights Photography',
    description: 'Chase auroras with a pro photographer and learn night shooting basics.',
    experienceDetails: 'Drive to clear skies using real-time forecasts.\nSet up tripods and master exposure for dancing lights.\nWarm up with cocoa while reviewing your best shots.',
    location: 'Tromsø, Norway',
    priceCents: 12900,
    coverImageUrl: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.9,
  },
  {
    title: 'Street Food Safari',
    description: 'Taste 10+ local bites across bustling markets with a foodie guide.',
    experienceDetails: 'Navigate neon-lit markets and backstreet vendors.\nSample satay, mango sticky rice, and herbal drinks.\nLearn ordering etiquette and hygiene tips like a local.',
    location: 'Bangkok, Thailand',
    priceCents: 3900,
    coverImageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1526312426976-593c128eea49?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=80',
    ],
    rating: 4.7,
  },
  {
    title: 'Louvre Highlights Guided Tour',
    description: 'Skip-the-line access to the Mona Lisa and masterpieces with an expert guide.',
    experienceDetails: 'Unpack centuries of art in an efficient route.\nYour guide shares context and fun anecdotes.\nHeadsets ensure you hear clearly in busy galleries.',
    location: 'Paris, France',
    priceCents: 9900,
    coverImageUrl: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.8,
  },
  {
    title: 'Neon Nights Photo Walk',
    description: 'Capture Tokyo’s neon streets; composition tips from a local photographer.',
    location: 'Tokyo, Japan',
    priceCents: 7800,
    coverImageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.9,
  },
  {
    title: 'Ubud Rice Terraces Cycling',
    description: 'Leisurely ride through emerald paddies, temples, and village life.',
    location: 'Bali, Indonesia',
    priceCents: 5200,
    coverImageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1494475673543-6a6a27143b22?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1516483966624-4f22d0b3d86d?auto=format&fit=crop&w=1600&q=80',
    ],
    rating: 4.7,
  },
  {
    title: 'Central Park Bike Tour',
    description: 'Iconic bridges, hidden statues, and skyline views with a local guide.',
    location: 'New York, USA',
    priceCents: 6500,
    coverImageUrl: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.6,
  },
  {
    title: 'Santorini Sunset Sailing',
    description: 'Catamaran cruise, snorkeling, and dinner—best caldera sunset vantage.',
    location: 'Santorini, Greece',
    priceCents: 14900,
    coverImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.8,
  },
  {
    title: 'Desert Dune Bashing & Camp',
    description: 'Thrilling 4x4 dunes ride, sunset photos, and Bedouin-style dinner.',
    location: 'Dubai, UAE',
    priceCents: 9900,
    coverImageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.5,
  },
  {
    title: 'Wine & Vineyards Day Trip',
    description: 'Scenic countryside tour with tastings at three boutique wineries.',
    location: 'Tuscany, Italy',
    priceCents: 11500,
    coverImageUrl: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1600&auto=format&fit=crop',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop',
    ],
    rating: 4.8,
  },
];

async function main() {
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.promoCode.deleteMany();

  await prisma.promoCode.createMany({
    data: [
      { code: 'SAVE10', type: PromoType.PERCENT, percent: 10, amountCents: null, active: true },
      { code: 'FLAT100', type: PromoType.FLAT, percent: null, amountCents: 10000, active: true },
    ],
  });

  const defaultDetails = (
    title: string,
  ) => `${title} highlights\n\n• Meet your guide and get a friendly briefing.\n• Enjoy immersive moments and photo stops.\n• Hear local stories, tips, and culture insights.`;

  const created = [] as { id: string }[];
  for (const e of experiences) {
    const dataWithDetails = { ...e, experienceDetails: e.experienceDetails ?? defaultDetails(e.title) } as any;
    const exp = await prisma.experience.create({ data: dataWithDetails });
    created.push({ id: exp.id });
  }

  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const slotsData: { experienceId: string; startTime: Date; endTime: Date; capacity: number }[] = [];
  created.forEach((c, idx) => {
    // Create 4 upcoming slots per experience over the next 8 days
    [2, 4, 6, 8].forEach((d) => {
      const start = new Date(now.getTime() + (d + idx) * dayMs);
      // Alternate morning/evening
      if ((d + idx) % 2 === 0) {
        start.setHours(10, 0, 0, 0);
      } else {
        start.setHours(18, 0, 0, 0);
      }
      const end = new Date(start.getTime());
      end.setHours(start.getHours() + 2, 0, 0, 0);
      const capacity = 6 + (idx % 3) * 4; // 6,10,14 variety
      slotsData.push({ experienceId: c.id, startTime: start, endTime: end, capacity });
    });
  });

  await prisma.slot.createMany({ data: slotsData });

  console.log(`Seeded ${created.length} experiences and ${slotsData.length} slots successfully`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


