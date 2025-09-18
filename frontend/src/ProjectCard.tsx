import React from 'react';

// Интерфейс для типизации данных проекта
interface Project {
  id: number;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
}

const ProjectImage: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
    if (imageUrl) {
        return (
            <div className="relative w-full h-80 bg-gray-800 rounded-t-xl overflow-hidden">
                <img src={imageUrl} alt="Project" className="absolute inset-0 w-full h-full object-cover" />
            </div>
        );
    }
    return (
        <div className="relative w-full h-48 bg-gray-800 rounded-t-xl overflow-hidden">
            <svg
                className="absolute inset-0 w-full h-full text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index: _index }) => {
  const isOdd = _index % 2 !== 0;

  return (
    <a 
      href={project.url} 
      className={`block group project-card max-w-lg md:max-w-2xl ${isOdd ? 'md:self-end' : 'md:self-start'}`}
    >
      <div className="bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">
        <ProjectImage imageUrl={project.image_url} />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-200">{project.title}</h3>
          <p className="text-gray-400 leading-relaxed">{project.description}</p>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;