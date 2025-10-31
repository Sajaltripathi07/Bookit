import { Link, Outlet, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const showBreadcrumb = location.pathname !== '/';
  return (
    <div>
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="container-page py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-primary">Bookit</Link>
          <nav className="text-sm text-slate-600">Explore unique travel experiences</nav>
        </div>
      </header>
      <main className="container-page py-6">
        {showBreadcrumb && (
          <div className="mb-4 text-sm text-slate-600">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <span>Explore</span>
          </div>
        )}
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="container-page py-6 text-sm text-slate-500">© Bookit</div>
      </footer>
    </div>
  );
}


