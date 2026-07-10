import NavBar from '@/components/ui/NavBar';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import SpaceBackgroundClient from '@/components/three/SpaceBackgroundClient';

export default function Home() {
  return (
    <main style={{ background: 'transparent', position: 'relative' }}>
      <SpaceBackgroundClient />
      <ScrollProgress />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
}
