import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import axios from 'axios';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useApi(`/api/posts/${id}`);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        navigate('/'); // Go back to home after delete
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error || !post) return <p>Post not found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mt-2">{post.content}</p>
      <p className="mt-2 text-gray-600">
        <strong>Category:</strong> {post.category?.name || 'Uncategorized'}
      </p>

      <div className="mt-4 space-x-2">
        <button
          onClick={() => navigate(`/edit/${post._id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
