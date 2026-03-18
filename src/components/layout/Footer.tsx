import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT, cities, services } from "@/lib/seo-data";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="font-black text-accent-foreground">A</span>
              </div>
              <span className="text-lg font-bold">
                Ayoub<span className="text-accent">Touati</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              {t("footer.description")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-accent transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tarifs" className="hover:text-accent transition-colors font-semibold">
                  Nos tarifs →
                </Link>
              </li>
              <li>
                <Link to="/audit-seo-gratuit" className="hover:text-accent transition-colors font-semibold">
                  Audit SEO gratuit →
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {t("footer.cities")}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {cities.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link to={`/agence-digitale-${city.slug}`} className="hover:text-accent transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/agence-digitale-maroc" className="hover:text-accent transition-colors font-semibold">
                  Tout le Maroc →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                {t("footer.address")}
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a href="https://web.facebook.com/touati.ayoub02" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-accent" />
                </a>
                <a href="https://www.instagram.com/touati.ayoub55/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-accent" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} {CONTACT.name}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
