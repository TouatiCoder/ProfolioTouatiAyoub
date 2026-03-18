import { useState, useEffect } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const { locale } = useI18n();
  const isAr = locale === "ar";

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit-popup-dismissed");
    if (dismissed) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true);
        document.removeEventListener("mouseout", handler);
      }
    };

    // Also show after 45 seconds if not dismissed
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("exit-popup-dismissed")) {
        setShow(true);
      }
    }, 45000);

    document.addEventListener("mouseout", handler);
    return () => {
      document.removeEventListener("mouseout", handler);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "1");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4" onClick={dismiss}>
      <div
        className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 mb-6">
          <Search className="h-7 w-7 text-accent" />
        </div>

        <h3 className="text-xl font-extrabold mb-2">
          {isAr ? "🎁 احصل على تدقيق SEO مجاني!" : "🎁 Obtenez votre audit SEO gratuit !"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {isAr
            ? "اكتشف ما يمنع موقعك من الظهور في الصفحة الأولى من Google. تحليل مجاني مع توصيات عملية."
            : "Découvrez ce qui empêche votre site d'apparaître en 1ère page de Google. Analyse gratuite avec recommandations actionnables."}
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/audit-seo-gratuit" onClick={dismiss}>
              {isAr ? "طلب تدقيق مجاني" : "Demander mon audit gratuit"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <button
            onClick={dismiss}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            {isAr ? "لا شكرًا" : "Non merci"}
          </button>
        </div>
      </div>
    </div>
  );
}
