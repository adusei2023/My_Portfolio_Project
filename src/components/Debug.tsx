import React from 'react';

const Debug: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg opacity-50 hover:opacity-100">
      <pre>
        {JSON.stringify({
          supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
          supabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
          env: import.meta.env.MODE,
          time: new Date().toISOString(),
        }, null, 2)}
      </pre>
    </div>
  );
};

export default Debug; 