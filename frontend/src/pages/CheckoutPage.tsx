import { FormEvent, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBooking, fetchExperience, validatePromo, formatCents } from '../lib/api';
import { useEffect } from 'react';
import Button from '../components/Button';

export default function CheckoutPage() {
  const { id, slotId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promo, setPromo] = useState('');
  const [promoInfo, setPromoInfo] = useState<{ valid: boolean; type?: 'PERCENT' | 'FLAT'; amountCents?: number; percent?: number } | null>(null);
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [experience, setExperience] = useState<Awaited<ReturnType<typeof fetchExperience>> | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchExperience(id).then(setExperience).catch(() => setError('Failed to load experience'));
  }, [id]);

  const totalCents = useMemo(() => {
    const base = experience?.priceCents ?? 0;
    if (!promoInfo?.valid) return base;
    if (promoInfo.type === 'PERCENT' && promoInfo.percent) {
      const discount = Math.floor((base * promoInfo.percent) / 100);
      return Math.max(0, base - discount);
    }
    if (promoInfo.type === 'FLAT' && promoInfo.amountCents) {
      return Math.max(0, base - promoInfo.amountCents);
    }
    return base;
  }, [experience?.priceCents, promoInfo]);

  async function onValidatePromo() {
    setLoadingPromo(true);
    setError(null);
    try {
      const info = await validatePromo(promo);
      setPromoInfo(info);
    } catch {
      setPromoInfo({ valid: false });
    } finally {
      setLoadingPromo(false);
    }
  }

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!id || !slotId) return;
    if (!name || !email.includes('@')) {
      setError('Please enter a valid name and email');
      return;
    }
    try {
      setSubmitting(true);
      const res = await createBooking({ experienceId: id, slotId, name, email, promoCode: promo || undefined });
      navigate('/result', { state: { success: true, bookingId: res.id } });
    } catch (err: any) {
      navigate('/result', { state: { success: false, message: err?.response?.data?.message || 'Booking failed' } });
    } finally {
      setSubmitting(false);
    }
  }

  if (!experience) return <div className="animate-pulse text-slate-400">Loading checkout...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Traveler details</h2>
        <div>
          <label className="block text-sm text-slate-600">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Promo code</label>
          <div className="mt-1 flex gap-2">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="SAVE10 or FLAT100" />
            <Button type="button" onClick={onValidatePromo} variant="secondary" className="text-sm" disabled={loadingPromo} loading={loadingPromo}>Apply</Button>
          </div>
          {promoInfo && (
            <div className={`text-sm mt-1 ${promoInfo.valid ? 'text-green-600' : 'text-red-600'}`}>
              {promoInfo.valid ? 'Promo applied' : 'Invalid promo code'}
            </div>
          )}
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Button type="submit" loading={submitting}>Confirm booking</Button>
      </form>

      <div className="border rounded-xl p-4 h-fit bg-white shadow-sm lg:sticky lg:top-6">
        <h3 className="font-semibold mb-2">Summary</h3>
        <div className="flex items-center gap-3">
          <img src={experience.coverImageUrl} className="w-20 h-16 object-cover rounded" />
          <div>
            <div className="font-medium">{experience.title}</div>
            <div className="text-sm text-slate-600">{experience.location}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCents(experience.priceCents)}</span>
        </div>
        {promoInfo?.valid && (
          <div className="mt-1 flex items-center justify-between text-green-700">
            <span>Discount</span>
            <span>{promoInfo.type === 'PERCENT' ? `${promoInfo.percent}%` : `- ${formatCents(promoInfo.amountCents || 0)}`}</span>
          </div>
        )}
        <div className="mt-2 pt-2 border-t flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>{formatCents(totalCents)}</span>
        </div>
      </div>
    </div>
  );
}


