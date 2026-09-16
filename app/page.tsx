import { Countdown } from "@/components/countdown";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Locations } from "@/components/locations";
import { Overview } from "@/components/overview";
import { Prizes } from "@/components/prizes";
import { Timeline } from "@/components/timeline";
import { FinalCta, Footer } from "@/components/footer";
import { MotionShell } from "@/components/motion-shell";

export default function Home() {
  return (
    <MotionShell>
      <main>
        <Header />
        <Hero />
        <Countdown />
        <Overview />
        <Timeline />
        <Locations />
        <Prizes />
        <FinalCta />
        <Footer />
      </main>
    </MotionShell>
  );
}
