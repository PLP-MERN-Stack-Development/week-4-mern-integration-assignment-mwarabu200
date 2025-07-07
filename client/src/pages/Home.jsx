import useApi from '../hooks/useApi';
import PostList from '../components/PostList';

export default function Home() {
  const { data: posts, loading, error } = useApi('/api/posts');

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Failed to load posts: {error.message}</p>;

  return <PostList posts={posts || []} />;
}
