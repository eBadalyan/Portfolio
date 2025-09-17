import React from 'react';

// Интерфейс для типизации данных проекта
interface Project {
  id: number;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
}

// Теперь ProjectList получает список проектов в качестве пропса
interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Здесь пока нет проектов.
          </p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Посмотреть проект
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;