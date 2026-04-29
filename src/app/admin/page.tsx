'use client';

import { useEffect, useState } from 'react';
import FeedbackList from '../components/FeedbackList';

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setFeedbacks(data);
      } else {
        console.error('Failed to fetch data:', data);
        setFeedbacks([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-4 border-b-2 border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Back to Public Portal
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <p className="text-gray-500 animate-pulse text-lg">Loading feedback...</p>
          </div>
        ) : (
          <FeedbackList 
            feedbacks={feedbacks} 
            isAdmin={true} 
            onRefresh={fetchFeedback} 
          />
        )}
      </div>
    </main>
  );
}
