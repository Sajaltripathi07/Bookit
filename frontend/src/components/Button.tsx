import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
};

export default function Button({ variant = 'primary', loading, className = '', children, disabled, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-sky-600 focus:ring-sky-500',
    secondary: 'bg-slate-900 text-white hover:bg-black focus:ring-slate-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300',
  };
  const state = disabled || loading ? 'opacity-60 cursor-not-allowed' : '';
  return (
    <button className={`${base} ${variants[variant]} ${state} px-4 py-2 ${className}`} disabled={disabled || loading} {...rest}>
      {loading && <span className="mr-2 inline-block h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />}
      {children}
    </button>
  );
}


