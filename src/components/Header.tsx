import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navItems } from '@/data';

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative z-50 border-b border-navy-800/80 bg-navy-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/35 to-transparent" aria-hidden />
      <div className="container-px">
        <div className="flex min-h-[4.5rem] items-center py-2 sm:min-h-[5.25rem] sm:py-0">
          <nav className="flex flex-1 flex-wrap items-center gap-0.5 sm:gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setServicesOpen((open) => !open)}
                    className={`flex items-center gap-0.5 rounded-md px-2 py-2 text-xs font-semibold transition-colors sm:gap-1 sm:px-4 sm:text-sm ${
                      location.pathname.startsWith('/leistungen')
                        ? 'text-accent-400'
                        : 'text-white hover:text-accent-400'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute left-0 top-full z-50 w-72 origin-top pt-2 transition-all ${
                      servicesOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden rounded-lg border border-navy-700 bg-navy-900 shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-3 text-sm font-medium text-navy-100 transition-colors hover:bg-accent-500 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-md px-2 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                      isActive ? 'text-accent-400' : 'text-white hover:text-accent-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
