import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { Personal } from "@/components/sections/personal";
import { Business } from "@/components/sections/business";
import { Unified } from "@/components/sections/unified";
import { CardControls } from "@/components/product/card-controls";
import { HowItWorks } from "@/components/sections/how-it-works";
import { EarlyAccess } from "@/components/sections/early-access";
import { FAQs } from "@/components/sections/faqs";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Personal />
        <Business />
        <Unified />
        <CardControls />
        <HowItWorks />
        <EarlyAccess />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
