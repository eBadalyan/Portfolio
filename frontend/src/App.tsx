import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>('http://localhost:8000/projects/');
      setProjects(response.data);
    } catch (err) {
      setError('Не удалось загрузить проекты.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // GSAP animations
  useLayoutEffect(() => {
    // Hero Section text and button animation
    gsap.fromTo(".hero-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" });
    gsap.fromTo(".hero-button", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" });

    // --- ИСПРАВЛЕННАЯ АНИМАЦИЯ ФОНА ---
    // Сначала устанавливаем начальное состояние
    gsap.set(".hero-bg", { backgroundPositionX: "0%" });
    // Затем создаем анимацию, которая будет работать при прокрутке
    gsap.to(".hero-bg", {
      backgroundPositionX: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=500", 
        scrub: true,
      }
    });

    // About Section text animation (fade in on scroll)
    gsap.fromTo(".about-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out", scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
      toggleActions: "play none none none"
    }});
    
    // Поэтапная анимация карточек проектов при прокрутке
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      const htmlCard = card as HTMLElement;
      const isOdd = index % 2 !== 0;
      const startX = isOdd ? 100 : -100;
      
      gsap.fromTo(htmlCard,
        { x: startX, y: 100, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: {
            trigger: htmlCard,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
    });

  }, [projects]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-xl text-gray-200">Загрузка проектов...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-xl text-red-500">
      <p className="text-gray-200">Не удалось загрузить проекты.</p>
    </div>;
  }

  return (
    <div className="font-sans antialiased bg-gray-950 text-gray-200">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-950 overflow-hidden hero-section">
        {/* Анимированный градиент фона */}
        <div
          className="absolute inset-0 z-0 hero-bg"
          style={{
            background: 'linear-gradient(270deg, #1f2937, #111827, #1f2937)',
            backgroundSize: '200% 100%',
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-extrabold leading-none tracking-tight text-gray-200 mb-4 hero-text">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">Ваше Имя</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 mb-8 max-w-2xl mx-auto hero-text">
            Фронтенд-разработчик, который создает красивые и функциональные веб-приложения.
          </p>
          <button className="bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-600 transition duration-300 shadow-lg hero-button">
            Посмотреть проекты
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 about-section shadow-inner">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6 about-text">Обо мне</h2>
          <p className="text-lg text-gray-400 leading-relaxed about-text">
            Я страстно увлекаюсь созданием интуитивно понятных и визуально привлекательных пользовательских интерфейсов. Мой опыт включает работу с React, TypeScript и FastAPI, где я фокусируюсь на чистом коде и отзывчивом дизайне. Всегда в поиске новых вызовов и возможностей для роста.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-950 projects-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Мои проекты</h2>
          <ProjectList projects={projects} />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 bg-gray-900 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Ваше Имя. Все права защищены.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="hover:text-gray-200 transition duration-300">GitHub</a>
          <a href="#" className="hover:text-gray-200 transition duration-300">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default App;