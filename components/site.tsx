import { ApplicationModalProvider } from "@/components/application-modal";
import { Countdown } from "@/components/countdown";
import { FinalCta, Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { I18nProvider } from "@/components/i18n-provider";
import { Judging } from "@/components/judging";
import { Marquee } from "@/components/marquee";
import { MobileApplyBar } from "@/components/mobile-apply-bar";
import { MotionShell } from "@/components/motion-shell";
import { Overview } from "@/components/overview";
import { PageLoader } from "@/components/page-loader";
import { Prizes } from "@/components/prizes";
import { Schedule } from "@/components/schedule";
import { ScrollProgress } from "@/components/scroll-progress";
import { Venues } from "@/components/venues";
import type { Locale } from "@/lib/i18n";

export function Site({ locale }: { locale: Locale }) {
  return (
    <MotionShell>
      <I18nProvider initialLocale={locale}>
        <ApplicationModalProvider>
          <PageLoader />
          <ScrollProgress />
          <Header />
          <main id="main">
            <Hero />
            <Countdown />
            <Marquee />
            <Overview />
            <Schedule />
            <Venues />
            <Prizes />
            <Judging />
            <FinalCta />
          </main>
          <Footer />
          <MobileApplyBar />
        </ApplicationModalProvider>
      </I18nProvider>
    </MotionShell>
  );
}
