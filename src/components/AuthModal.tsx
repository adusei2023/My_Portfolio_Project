import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  title: string;
  bio: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    fullName: '',
    title: '',
    bio: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        
        setSuccess('Sign in successful!');
        onAuthSuccess?.();
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        // Sign up with additional profile data
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              title: formData.title,
            },
          },
        });

        if (signUpError) throw signUpError;

        // If sign up successful, create profile record
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                full_name: formData.fullName,
                title: formData.title,
                bio: formData.bio,
              },
            ]);

          if (profileError) throw profileError;
          
          // Show success message for sign up
          setSuccess('Sign up successful! Please check your email for verification.');
          // Wait 2 seconds before closing the modal
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-6">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Additional fields for sign up */}
          {!isSignIn && (
            <>
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Full Stack Developer"
                  className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        <button
          onClick={() => {
            setIsSignIn(!isSignIn);
            setFormData({
              email: '',
              password: '',
              fullName: '',
              title: '',
              bio: '',
            });
            setError(null);
          }}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal; 