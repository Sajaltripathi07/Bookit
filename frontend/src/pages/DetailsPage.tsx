import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExperienceDetails, fetchExperience, formatCents } from '../lib/api';
import Badge from '../components/Badge';
import Button from '../components/Button';

export default function DetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState<ExperienceDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchExperience(id).then(setData).catch(() => setError('Failed to load experience'));
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return <div className="animate-pulse text-slate-400">Loading details...</div>;

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <div className="relative">
          <img src={data.coverImageUrl} className="w-full rounded-xl" alt={data.title} />
          <div className="absolute top-3 left-3"><Badge>{data.location}</Badge></div>
        </div>
        {data.galleryImageUrls?.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {data.galleryImageUrls.map((g, idx) => (
              <img key={idx} src={g} className="w-full h-24 object-cover rounded" />
            ))}
          </div>
        )}
        <div className="mt-6 space-y-3">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="text-slate-600">⭐ {data.rating.toFixed(1)} · {data.location}</div>
          <p className="leading-7 text-slate-800">{data.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold mb-1">What you'll experience</h3>
            <p className="text-slate-700 whitespace-pre-line leading-7">{data.experienceDetails}</p>
          </div>
        </div>
      </div>
      <aside className="lg:col-span-5 lg:sticky lg:top-6 h-fit border rounded-xl p-4 bg-white shadow-sm">
        <div className="flex items-baseline justify-between">
          <div className="text-xl font-semibold">{formatCents(data.priceCents)}</div>
          <div className="text-sm text-slate-600">per person</div>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Available slots</h2>
          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {data.slots.length === 0 && <div className="text-slate-500">No slots scheduled</div>}
            {data.slots.map((s) => {
              const start = new Date(s.startTime).toLocaleString();
              const end = new Date(s.endTime).toLocaleTimeString();
              const soldOut = s.available === 0;
              return (
                <div key={s.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <div className="font-medium">{start} - {end}</div>
                    <div className="text-xs text-slate-600">{s.booked}/{s.capacity} booked · {s.available} left</div>
                  </div>
                  {soldOut ? (
                    <Badge className="bg-red-100 text-red-700">Sold out</Badge>
                  ) : (
                    <Link to={`/checkout/${data.id}/${s.id}`}>
                      <Button className="text-xs">Book</Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}


