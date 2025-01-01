import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
      <div className="prose prose-lg text-gray-600">
        <p className="mb-4">
          I'm a passionate full-stack developer with experience in modern web technologies.
          I love building user-friendly applications and solving complex problems.
        </p>
        <p className="mb-4">
          My expertise includes React, TypeScript, Node.js, and various other modern
          web development tools and frameworks.
        </p>
      </div>
    </div>
  );
};

export default About; 