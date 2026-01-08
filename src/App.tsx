
import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import ExperienceSection from './components/ExperienceSection';
import Projects from './components/Projects';
import ChatAssistant from './components/ChatAssistant';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Publications from './components/Publications';

const App: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -80px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-white min-h-screen text-zinc-950 selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Refined Background Aurora Atmosphere */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/30 rounded-full blur-[160px] pointer-events-none z-0 animate-float" />
      <div className="fixed bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/20 rounded-full blur-[140px] pointer-events-none z-0" style={{ animation: 'floating 8s ease-in-out infinite reverse' }} />
      <div className="fixed top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="space-y-4 md:space-y-8 pb-8">
          <About />
          <ExperienceSection />
          <Projects />
          <Publications />
          
          <div className="relative">
             <ChatAssistant />
          </div>

          <ContactForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
