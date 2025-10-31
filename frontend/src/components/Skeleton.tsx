import { HTMLAttributes } from 'react';

export default function Skeleton({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} {...rest} />;
}


