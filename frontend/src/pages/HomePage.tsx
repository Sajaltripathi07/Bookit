import { useEffect, useState } from 'react';
import { ExperienceListItem, fetchExperiences } from '../lib/api';
import ExperienceCard from '../components/ExperienceCard';
import Skeleton from '../components/Skeleton';

export default function HomePage() {
  const [items, setItems] = useState<ExperienceListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences().then(setItems).catch(() => setError('Failed to load experiences'));
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!items) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Explore travel experiences</h1>
          <p className="text-slate-600">Handpicked adventures, tours, and activities</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <Skeleton className="aspect-video" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-sky-600 bg-clip-text text-transparent">Explore travel experiences</h1>
        <p className="text-slate-600">Handpicked adventures, tours, and activities</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((exp) => (
          <ExperienceCard key={exp.id} item={exp} />
        ))}
      </div>
    </div>
  );
}


