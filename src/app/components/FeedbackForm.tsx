'use client';

import { useState } from 'react';

export default function FeedbackForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setName('');
      setRating(0);
      setComment('');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit Feedback</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Rating: {rating} Star{rating !== 1 && 's'}</label>
          <div className="flex items-center space-x-2" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="cursor-pointer select-none"
                role="radio"
                aria-checked={rating === star}
                tabIndex={0}
                onClick={() => setRating(star)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setRating(star);
                  }
                }}
              >
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  className="sr-only"
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
                <span
                  className={`text-3xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                  aria-hidden="true"
                >
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Comment</label>
          <textarea
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
