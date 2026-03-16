import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Timeline from '@/components/Timeline';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Timeline />
        <TechStack />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
