import React from 'react';
import { Project } from '../types/project';

interface ProjectCardProps extends Project {}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  repository_url,
  deployment_url,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex space-x-4">
        <a
          href={repository_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800"
        >
          Repository
        </a>
        <a
          href={deployment_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800"
        >
          Live Demo
        </a>
      </div>
    </div>
  );
};

export default ProjectCard; 