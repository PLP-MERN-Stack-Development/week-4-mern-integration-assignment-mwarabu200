import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostForm() {
  const { id } = useParams(); // edit mode if there's an id
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    axios.get('/api/categories').then((res) => setCategories(res.data));
  }, []);

  // If editing, load existing post
  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/posts/${id}`).then((res) => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, content, category };

    try {
      if (isEdit) {
        await axios.put(`/api/posts/${id}`, data);
      } else {
        await axios.post('/api/posts', data);
      }
      navigate('/');
    } catch (err) {
      alert('Error saving post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
    </form>
  );
}
