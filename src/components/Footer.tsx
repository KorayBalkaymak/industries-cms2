import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { company, services } from '@/data';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <BrandLogo variant="footer" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-navy-400">
              {company.legalName}. Engineering Services & Construction Management für die Industrie.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Leistungen</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/leistungen/${s.slug}`}
                    className="text-navy-300 transition-colors hover:text-accent-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Unternehmen</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/projekte" className="text-navy-300 transition-colors hover:text-accent-400">Projekte</Link></li>
              <li><Link to="/ueber-uns" className="text-navy-300 transition-colors hover:text-accent-400">Über uns</Link></li>
              <li><Link to="/kontakt" className="text-navy-300 transition-colors hover:text-accent-400">Kontakt</Link></li>
              <li><Link to="/impressum" className="text-navy-300 transition-colors hover:text-accent-400">Impressum</Link></li>
              <li><Link to="/datenschutz" className="text-navy-300 transition-colors hover:text-accent-400">Datenschutz</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Kontakt</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" />
                <span className="text-navy-300">{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent-500" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-navy-300 hover:text-accent-400">{company.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent-500" />
                <a href={`mailto:${company.email}`} className="text-navy-300 hover:text-accent-400">{company.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 text-xs text-navy-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-accent-400">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-accent-400">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
