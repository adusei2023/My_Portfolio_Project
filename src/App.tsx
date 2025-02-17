import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Project } from './types/project';
import AddProjectModal from './components/AddProjectModal';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Contact from './components/Contact';
import AuthModal from './components/AuthModal';
import EditProjectModal from './components/EditProjectModal';
import { User } from '@supabase/supabase-js';
import Debug from './components/Debug';
import ErrorDisplay from './components/ErrorDisplay';

const DEBUG = true;

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'projects' | 'about' | 'contact'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  if (DEBUG) {
    console.log('App mounting with env:', {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL?.slice(0, 5) + '...',
      hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      mode: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD
    });
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Environment check:', {
          supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
          supabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
          mode: import.meta.env.MODE
        });

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        await Promise.all([
          fetchProjects(),
          checkUser()
        ]);

      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize app'));
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const logEnvironmentInfo = () => {
      console.log('Environment check:', {
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
        hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      });
    };

    logEnvironmentInfo();
  }, []);

  useEffect(() => {
    const checkEnvironment = () => {
      console.log('Environment Variables Check:', {
        hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
        hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
        nodeEnv: import.meta.env.MODE,
      });
    };

    checkEnvironment();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditProjectModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      // Refresh projects list
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleAuthSuccess = () => {
    setActiveSection('projects');  // Force navigation to projects
    fetchProjects();  // Refresh projects list
  };

  const renderProjects = () => (
    <div className="space-y-8">
      {user && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddProjectModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Project
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            isOwner={user?.id === project.user_id}
            onEdit={() => handleEditProject(project)}
            onDelete={() => handleDeleteProject(project.id!)}
          />
        ))}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return renderProjects();
    }
  };

  const renderLandingPage = () => (
    <div className="bg-gradient-to-b from-indigo-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'projects' ? (
          // Show projects landing page
          <>
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-8">
                Welcome to My Portfolio
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                Discover my journey through code, projects, and technical experiences. 
                Sign in to explore my full portfolio and add your own projects.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Preview Projects Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600 mb-6">
                Want to see more? Sign in to explore all projects.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
              >
                Sign In
              </button>
            </div>
          </>
        ) : (
          // Show About or Contact sections without requiring auth
          <main className="max-w-7xl mx-auto">
            {renderSection()}
          </main>
        )}
      </div>
    </div>
  );

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNavigate={setActiveSection} 
        activeSection={activeSection} 
        user={user}
      />
      
      {user ? (
        // Authenticated view
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSection()}
        </main>
      ) : (
        // Landing page and non-auth sections
        renderLandingPage()
      )}

      <footer className="bg-white mt-12 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2024 MyPortfolio. Built with React and TailwindCSS.
          </p>
        </div>
      </footer>

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onProjectAdded={fetchProjects}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {selectedProject && (
        <EditProjectModal
          isOpen={isEditProjectModalOpen}
          onClose={() => {
            setIsEditProjectModalOpen(false);
            setSelectedProject(null);
          }}
          onProjectUpdated={fetchProjects}
          project={selectedProject}
        />
      )}

      {import.meta.env.DEV && <Debug />}
    </div>
  );
};

export default App; 