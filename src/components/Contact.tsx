import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Me</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600 mb-6">
          Feel free to reach out to me for any questions or opportunities.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Email</h3>
            <p className="text-gray-600">your.email@example.com</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">LinkedIn</h3>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              linkedin.com/in/yourprofile
            </a>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">GitHub</h3>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              github.com/yourusername
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 