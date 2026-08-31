import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/Header";
import { TechStack } from "@/components/home/TechStack";
import { WebsiteShowcase } from "@/components/home/WebsiteShowcase";
import Index from "@/pages/Index";
import { I18nContext, translations, type I18nContextType } from "@/lib/i18n";

const frContext: I18nContextType = {
  locale: "fr",
  setLocale: vi.fn(),
  t: (key: string) => translations.fr[key] ?? key,
  dir: "ltr",
};

function renderWithProviders(ui: ReactNode) {
  return render(
    <I18nContext.Provider value={frContext}>
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        {ui}
      </MemoryRouter>
    </I18nContext.Provider>,
  );
}

function mockApiResponse(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

function mockPendingApiResponse() {
  return vi.spyOn(globalThis, "fetch").mockImplementation(() => new Promise<Response>(() => {}));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("homepage redesign", () => {
  it("shows the requested navigation labels and project CTA", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: "Accueil" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "À propos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Réalisations" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Technologies" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Parler de mon projet" })).toBeInTheDocument();
  });

  it("renders the technology stack as a controlled carousel", () => {
    mockPendingApiResponse();

    renderWithProviders(<TechStack />);

    expect(screen.getByRole("region", { name: "Technologies que j'utilise" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Technologie précédente" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Technologie suivante" })).toBeInTheDocument();
    expect(screen.getByText("React.js")).toBeInTheDocument();
    // Multiple technologies (React.js, Next.js, TypeScript...) legitimately
    // share the "Frontend" category label, so more than one match is
    // correct here — assert at least one exists rather than a single match.
    expect(screen.getAllByText("Frontend").length).toBeGreaterThan(0);
  });

  it("does not render fake projects when no featured projects exist", async () => {
    mockApiResponse([]);

    renderWithProviders(<WebsiteShowcase />);

    expect(await screen.findByText("Aucun projet publié pour le moment.")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant Le Palais")).not.toBeInTheDocument();
  });

  it("surfaces latest technical articles on the homepage", () => {
    mockPendingApiResponse();

    renderWithProviders(<Index />);

    expect(screen.getByRole("heading", { name: "Derniers articles techniques" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Déployer une application Laravel/i,
      }),
    ).toHaveAttribute("href", "/blog/deployer-application-laravel-vps-aws-azure");
  });
});
