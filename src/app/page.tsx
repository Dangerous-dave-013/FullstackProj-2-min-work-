'use client';

import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

export default function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
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
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
          Customer Feedback Portal
        </h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <FeedbackForm onSuccess={fetchFeedback} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Reviews</h2>
            {loading ? (
              <p className="text-gray-500 animate-pulse text-lg">Loading feedback...</p>
            ) : (
              <FeedbackList feedbacks={feedbacks} />
            )}
            
            <div className="mt-12 text-center border-t border-gray-300 pt-8">
              <a href="/admin" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors shadow">
                Go to Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
