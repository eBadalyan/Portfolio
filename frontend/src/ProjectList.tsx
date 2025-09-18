import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  url?: string;
  image_url?: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-12">
      <div className="flex flex-col space-y-16">
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Здесь пока нет проектов.
          </p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;