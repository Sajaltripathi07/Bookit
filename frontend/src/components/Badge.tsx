import { HTMLAttributes } from 'react';

export default function Badge({ className = '', children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 text-xs px-2 py-1 ${className}`} {...rest}>
      {children}
    </span>
  );
}


