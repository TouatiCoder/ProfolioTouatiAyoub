import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="font-black text-accent-foreground">A</span>
              </div>
              <span className="text-lg font-bold">
                Agence<span className="text-accent">Digitale</span>
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
              <li><Link to="/services/creation-site-web" className="hover:text-accent transition-colors">{t("services.web.title")}</Link></li>
              <li><Link to="/services/referencement-seo" className="hover:text-accent transition-colors">{t("services.seo.title")}</Link></li>
              <li><Link to="/services/marketing-digital" className="hover:text-accent transition-colors">{t("services.marketing.title")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {t("footer.company")}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/a-propos" className="hover:text-accent transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/realisations" className="hover:text-accent transition-colors">{t("nav.portfolio")}</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">{t("nav.blog")}</Link></li>
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
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                +212 XXX-XXXXXX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                contact@example.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} AgenceDigitale. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
