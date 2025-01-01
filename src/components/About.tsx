import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">About Me</h2>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Background</h3>
          <p className="text-gray-600">
            I am a passionate software developer with experience in building web applications
            using modern technologies. My journey in software development started with a
            curiosity about how things work on the internet, which led me to pursue a
            career in web development.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Frontend</h4>
              <ul className="text-gray-600 space-y-1">
                <li>React</li>
                <li>TypeScript</li>
                <li>TailwindCSS</li>
                <li>Next.js</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Backend</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Tools</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Git</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>Vercel</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Experience</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Senior Software Engineer</h4>
              <p className="text-gray-600">Tech Company - 2020-Present</p>
              <p className="text-gray-600 mt-2">
                Lead development of multiple web applications, mentored junior developers,
                and implemented best practices for code quality and testing.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Software Developer</h4>
              <p className="text-gray-600">Startup Inc. - 2018-2020</p>
              <p className="text-gray-600 mt-2">
                Developed and maintained various client projects, worked with modern
                JavaScript frameworks, and collaborated with cross-functional teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 