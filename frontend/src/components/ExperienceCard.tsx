import { Link } from 'react-router-dom';
import Badge from './Badge';
import { ExperienceListItem } from '../lib/api';

type Props = { item: ExperienceListItem };

export default function ExperienceCard({ item }: Props) {
  return (
    <div className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all bg-white">
      <div className="relative aspect-video bg-slate-100">
        <img src={item.coverImageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur">{item.location}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs shadow">⭐ {item.rating.toFixed(1)}</div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</p>
        <div className="mt-2 text-sm text-slate-600">From <span className="font-medium text-slate-900">${(item.priceCents / 100).toFixed(2)}</span> per person</div>
        <div className="mt-4 flex items-center justify-between">
          <Link to={`/experience/${item.id}`} className="text-primary hover:underline">View details</Link>
          <Link to={`/experience/${item.id}`} className="text-sm text-slate-700 hover:text-slate-900">Explore →</Link>
        </div>
      </div>
    </div>
  );
}


