'use client';

type Feedback = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function FeedbackList({
  feedbacks,
  isAdmin = false,
  onRefresh,
}: {
  feedbacks: Feedback[];
  isAdmin?: boolean;
  onRefresh?: () => void;
}) {

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (res.ok) {
        onRefresh?.();
      } else {
        alert('Failed to delete review');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  if (!feedbacks || feedbacks.length === 0) {
    return <p className="text-gray-500 italic text-center py-8">No feedback yet. Be the first to review!</p>;
  }

  const avgRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-700">Total Reviews: {feedbacks.length}</h3>
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-2 text-gray-700">Average Rating:</span>
          <span className="text-yellow-500 text-2xl font-bold">{avgRating.toFixed(1)}</span>
          <span className="text-gray-400 text-sm ml-1">/ 5.0</span>
        </div>
      </div>

      <div className="space-y-4">
        {feedbacks.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-lg shadow border relative">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                   <span key={star} className={star <= item.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">{item.comment}</p>
            <p className="text-xs text-gray-400 border-t pt-2 mt-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
            
            {isAdmin && (
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 text-sm font-medium transition"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
