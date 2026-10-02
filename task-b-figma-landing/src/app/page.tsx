import { CoursesSection } from "@/components/CoursesSection";
import { ServicesSection } from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="mx-auto max-w-[120rem] overflow-x-clip">
      <ServicesSection />
      <CoursesSection />
    </main>
  );
}
