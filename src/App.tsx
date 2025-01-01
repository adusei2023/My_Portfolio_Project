import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Contact from './components/Contact';

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with React and Node.js, featuring user authentication and payment integration.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800",
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    tags: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application using OpenWeather API with location-based forecasting.",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800",
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    tags: ["React", "API Integration", "TailwindCSS"]
  },
  {
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates and team features.",
    imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800",
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    tags: ["React", "Firebase", "Material-UI"]
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'projects' | 'about' | 'contact'>('projects');

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={setActiveSection} activeSection={activeSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MyPortfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover my latest projects and technical experiences. Each project represents a unique challenge and learning opportunity.
          </p>
        </div>

        {renderSection()}
      </main>

      <footer className="bg-white mt-12 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2024 MyPortfolio. Built with React and TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App; 