import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button';

export default function ResultPage() {
  const location = useLocation() as { state?: { success?: boolean; message?: string; bookingId?: string } };
  const success = location.state?.success;
  const message = location.state?.message;
  const bookingId = location.state?.bookingId;

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="text-4xl">🎉</div>
        <h1 className="text-2xl font-semibold mt-2">Booking confirmed</h1>
        {bookingId && <p className="text-slate-600 text-sm mt-1">Reference: {bookingId}</p>}
        <div className="mt-6">
          <Link to="/"><Button>Back to home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="text-4xl">😞</div>
      <h1 className="text-2xl font-semibold mt-2">Booking failed</h1>
      {message && <p className="text-slate-600 text-sm mt-1">{message}</p>}
      <div className="mt-6">
        <Link to="/"><Button variant="secondary">Try again</Button></Link>
      </div>
    </div>
  );
}


