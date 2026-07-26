import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navItems } from '@/data';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative z-50 border-b border-navy-800/80 bg-navy-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/35 to-transparent" aria-hidden />
      <div className="container-px">
        <div className="flex h-[5.25rem] items-center">
          <nav className="hidden flex-1 items-center gap-1 lg:flex">
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
                    className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                      location.pathname.startsWith('/leistungen')
                        ? 'text-accent-400'
                        : 'text-white hover:text-accent-400'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute left-0 top-full w-72 origin-top pt-2 transition-all ${
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
                    `rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-accent-400' : 'text-white hover:text-accent-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-auto rounded-md p-2 text-white lg:hidden"
            aria-label="Menü"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-navy-950 transition-all duration-300 lg:hidden ${
          mobileOpen ? 'max-h-[600px] border-t border-navy-800' : 'max-h-0'
        }`}
      >
        <nav className="container-px flex flex-col gap-1 py-4">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-semibold text-white"
                >
                  {item.label}
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 flex flex-col border-l border-navy-700 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="rounded-md px-4 py-2.5 text-sm font-medium text-navy-200 hover:text-accent-400"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-4 py-3 text-base font-semibold ${
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
    </header>
  );
}
