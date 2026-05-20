import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const CommunitiesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ForumsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const MessagesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const RepostIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const WarningIcon = ({ color = '#dc2626' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const AwarenessIcon = ({ color = '#f59e0b' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const SmallPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storiesList, setStoriesList] = useState([]);

  const [showComposer, setShowComposer] = useState(false);
  const [composerTab, setComposerTab] = useState('post');
  const [postContent, setPostContent] = useState('');
  const [postTag, setPostTag] = useState(null);
  const [postMedia, setPostMedia] = useState([]);
  const [posting, setPosting] = useState(false);

  const [expandedPost, setExpandedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState({});

  const [showStoryUpload, setShowStoryUpload] = useState(false);
  const [storyFile, setStoryFile] = useState(null);
  const [storyPreview, setStoryPreview] = useState(null);
  const [uploadingStory, setUploadingStory] = useState(false);

  const [viewingStory, setViewingStory] = useState(null);
  const [viewingStoryIndex, setViewingStoryIndex] = useState(0);
  const [storyComments, setStoryComments] = useState([]);
  const [storyCommentText, setStoryCommentText] = useState('');
  const [storyLikes, setStoryLikes] = useState({});

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('ujconnect_dark_mode') === 'true';
  });

  useEffect(() => {
    const saved = localStorage.getItem('ujconnect_dark_mode');
    if (saved === 'true') setDarkMode(true);
    fetchPosts();
    fetchUserProfile();
    fetchStories();
    const onStorage = () => {
      const saved = localStorage.getItem('ujconnect_dark_mode');
      setDarkMode(saved === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('ujconnect_dark_mode', darkMode ? 'true' : 'false');
    window.dispatchEvent(new Event('storage'));
  }, [darkMode]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`);
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
      if (data.dark_mode === 'true') setDarkMode(true);
    } catch (err) { /* silent */ }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts`);
      setPosts(data || []);
    } catch (err) { /* silent */ } finally { setLoading(false); }
  };

  const fetchStories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/stories`);
      setStoriesList(data || []);
    } catch (err) { /* silent */ }
  };

  const fetchComments = async (postId) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/comments/${postId}`);
      setComments(data);
    } catch (err) { /* silent */ }
  };

  const fetchStoryComments = async (storyId) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/comments/${storyId}`);
      setStoryComments(data || []);
    } catch (err) { /* silent */ }
  };

  const handlePostMediaUpload = async (file) => {
    if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    try {
      const { data } = await axios.post(`${API_URL}/api/upload`, fd);
      setPostMedia(prev => [...prev, data.url]);
    } catch (err) { /* silent */ }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim() && postMedia.length === 0) return;
    setPosting(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/posts`, {
        user_id: user.id,
        content: postContent,
        media_url: postMedia[0] || null,
        media_type: postMedia.length > 0 ? 'image' : null,
        post_type: postTag || 'post'
      });
      setPosts(prev => [data, ...prev]);
      setPostContent(''); setPostMedia([]); setPostTag(null); setShowComposer(false);
    } catch (err) { /* silent */ } finally { setPosting(false); }
  };

  const handleLikePost = async (postId) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/posts/${postId}/like`, { user_id: user.id });
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: data.liked ? p.likes_count + 1 : p.likes_count - 1 } : p));
      setLikedPosts(prev => ({ ...prev, [postId]: data.liked }));
    } catch (err) { /* silent */ }
  };

  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      await axios.post(`${API_URL}/api/comments/${postId}`, { user_id: user.id, content: commentText });
      setCommentText('');
      fetchComments(postId);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p));
    } catch (err) { /* silent */ }
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      await axios.delete(`${API_URL}/api/comments/${commentId}`);
      fetchComments(postId);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments_count: Math.max((p.comments_count || 1) - 1, 0) } : p));
    } catch (err) { /* silent */ }
  };

  const toggleComments = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
      setComments([]);
    } else {
      setExpandedPost(postId);
      fetchComments(postId);
      setCommentText('');
    }
  };

  const handleStoryFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStoryFile(file);
    const reader = new FileReader();
    reader.onload = () => setStoryPreview(reader.result);
    reader.readAsDataURL(file);
    setShowStoryUpload(true);
  };

  const handleUploadStory = async () => {
    if (!storyFile) return;
    setUploadingStory(true);
    const fd = new FormData(); fd.append('file', storyFile);
    try {
      const uploadRes = await axios.post(`${API_URL}/api/upload`, fd);
      const isVideo = storyFile.type.startsWith('video');
      await axios.post(`${API_URL}/api/stories`, {
        user_id: user.id,
        media_url: uploadRes.data.url,
        media_type: isVideo ? 'video' : 'image'
      });
      setStoryFile(null); setStoryPreview(null); setShowStoryUpload(false);
      fetchStories();
    } catch (err) { /* silent */ } finally { setUploadingStory(false); }
  };

  const handleViewStory = (story, index) => {
    setViewingStory(story);
    setViewingStoryIndex(index);
    fetchStoryComments(story.id);
  };

  const handleStoryComment = async (storyId) => {
    if (!storyCommentText.trim()) return;
    try {
      await axios.post(`${API_URL}/api/comments/${storyId}`, { user_id: user.id, content: storyCommentText });
      setStoryCommentText('');
      fetchStoryComments(storyId);
    } catch (err) { /* silent */ }
  };

  const handleStoryLike = async (storyId) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/posts/${storyId}/like`, { user_id: user.id });
      setStoryLikes(prev => ({ ...prev, [storyId]: data.liked }));
    } catch (err) { /* silent */ }
  };

  const formatTime = (dateString) => {
    const now = new Date(); const date = new Date(dateString);
    const diffMins = Math.floor((now - date) / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  const renderContent = (text) => {
    if (!text) return null;
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, i) => part.startsWith('#') ? <span key={i} style={{ color: '#4da6ff', fontWeight: 500 }}>{part}</span> : part);
  };

  const getFacultyColor = (dept) => {
    const cbeDepts = ['Applied Information Systems', 'Business Management', 'Economics and Econometrics', 'Finance & Investment Management', 'Information & Knowledge Management', 'Public Management & Governance', 'Hospitality', 'Commercial Accountancy', 'Industrial Psychology', 'Marketing', 'Transport & Supply Chain Management', 'Tourism', 'Accountancy'];
    if (cbeDepts.some(d => dept?.includes(d))) return '#2563eb';
    if (dept?.includes('Law')) return '#dc2626';
    if (dept?.includes('Science')) return '#16a34a';
    if (dept?.includes('Humanities')) return '#9333ea';
    if (dept?.includes('Health')) return '#ea580c';
    if (dept?.includes('Engineering')) return '#ca8a04';
    return '#666';
  };

  const getFacultyGradient = (dept) => {
    const color = getFacultyColor(dept);
    return `linear-gradient(135deg, ${color}, ${color}88)`;
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    borderLight: darkMode ? '#1a1a1a' : '#f5f5f5',
    cardBg: darkMode ? '#111' : '#f5f5f5',
    inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
    inputBorder: darkMode ? '#333' : '#e2e8f0',
  };

  const events = [
    { title: 'Graduations', subtitle: 'Class of 2026', color: '#2563eb', bg: '#eff6ff' },
    { title: 'Varsity Cup', subtitle: 'UJ vs Wits', color: '#dc2626', bg: '#fef2f2' },
    { title: 'Career Fair', subtitle: 'Aug 12-14', color: '#16a34a', bg: '#f0fdf4' },
    { title: 'Orientation', subtitle: 'New Students', color: '#9333ea', bg: '#faf5ff' },
    { title: 'Exam Prep', subtitle: 'Workshops', color: '#ea580c', bg: '#fff7ed' },
  ];

  const defaultStories = [
    { id: 'd1', name: 'Thabo', dept: 'Applied Information Systems' },
    { id: 'd2', name: 'Lerato', dept: 'Marketing' },
    { id: 'd3', name: 'Sipho', dept: 'Finance & Investment Management' },
    { id: 'd4', name: 'Amahle', dept: 'Information & Knowledge Management' },
    { id: 'd5', name: 'Neo', dept: 'Law' },
  ];

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const myStories = storiesList.filter(s => s.user_id === user.id);
  const otherStories = storiesList.filter(s => s.user_id !== user.id);
  const allDisplayStories = [...myStories.map(s => ({ ...s, isMine: true })), ...otherStories];

  const renderHome = () => (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => navigate('/profile')} style={{ width: '34px', height: '34px', borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>
          {!user.profile_pic && (user.full_name?.charAt(0) || user.email?.charAt(0) || 'U')}
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src="/UJCONNECT.png" alt="UJ Connect" style={{ height: '40px', width: 'auto' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ background: 'none', border: `1.5px solid ${theme.border}`, padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: theme.text, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} /> Live
          </button>
          <button onClick={() => setShowComposer(true)} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Post</button>
        </div>
      </div>

      {/* Events Banner */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {events.map((event, i) => (
            <div key={i} style={{ flexShrink: 0, width: '160px', padding: '12px', borderRadius: '12px', background: darkMode ? '#111' : event.bg, border: `1px solid ${darkMode ? '#222' : event.color}20`, cursor: 'pointer' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: event.color, marginBottom: '2px' }}>{event.title}</div>
              <div style={{ fontSize: '11px', color: theme.textSecondary }}>{event.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + What's happening */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: theme.inputBg, borderRadius: '24px', padding: '10px 16px', marginBottom: '12px' }}>
          <SearchIcon />
          <input type="text" placeholder="Search" style={{ width: '55px', border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', fontFamily: 'inherit', color: theme.text }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
            {!user.profile_pic && (user.full_name?.charAt(0) || user.email?.charAt(0) || 'U')}
          </div>
          <input type="text" placeholder="What's happening?" onFocus={() => setShowComposer(true)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'inherit', color: theme.text, background: 'transparent', cursor: 'pointer' }} readOnly />
        </div>
      </div>

      {/* Stories Row */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: '14px', overflowX: 'auto' }}>
        {/* Upload story - Your circle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <div onClick={() => document.getElementById('story-file-input').click()} style={{ width: '60px', height: '60px', borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: `2px solid ${theme.border}`, cursor: 'pointer', overflow: 'hidden' }}>
            {!user.profile_pic && <span style={{ fontWeight: 700, fontSize: '18px', color: theme.textSecondary }}>{user.full_name?.charAt(0) || 'U'}</span>}
            <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '22px', height: '22px', borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${theme.bg}`, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
              <span style={{ color: 'white', fontSize: '13px', lineHeight: 1, fontWeight: 700 }}>+</span>
            </div>
          </div>
          <span style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: 500 }}>You</span>
        </div>
        <input id="story-file-input" type="file" accept="image/*,video/*" onChange={handleStoryFileSelect} style={{ display: 'none' }} />

        {/* Real stories */}
        {allDisplayStories.map((story, idx) => (
          <div key={story.id} onClick={() => handleViewStory(story, idx)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', padding: '3px', background: story.isMine ? getFacultyGradient(user.department) : getFacultyGradient(story.department), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.cardBg }}>
                {story.media_type === 'video' ? (
                  <video src={story.media_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={story.media_url} alt="Story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
            </div>
            <span style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: 500 }}>
              {story.isMine ? 'You' : (story.preferred_name || story.full_name || 'User')}
            </span>
          </div>
        ))}

        {/* Default stories if no stories exist */}
        {allDisplayStories.length === 0 && defaultStories.map(story => (
          <div key={story.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', padding: '3px', background: getFacultyGradient(story.dept), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${getFacultyColor(story.dept)}, ${getFacultyColor(story.dept)}88)` }}>
                <span style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>{story.name.charAt(0)}</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: 500 }}>{story.name}</span>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div style={{ width: '30px', height: '30px', border: `3px solid ${theme.border}`, borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: theme.textSecondary, fontSize: '15px' }}>No posts yet. Be the first to share something!</div>
        ) : (
          posts.map(post => (
            <div key={post.id} style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.borderLight}` }}>
              <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => navigate(`/profile/${post.user_id}`)}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: post.profile_pic ? `url(${post.profile_pic}) center/cover` : theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: post.profile_pic ? 'transparent' : theme.textSecondary, fontWeight: 600, fontSize: '15px', flexShrink: 0, position: 'relative' }}>
                  {!post.profile_pic && (post.preferred_name || post.full_name || '?').charAt(0)}
                  {post.department && (
                    <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderRadius: '50%', background: getFacultyColor(post.department), border: `2px solid ${theme.bg}` }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: theme.text }}>{post.preferred_name || post.full_name || 'Student'}</span>
                    <span style={{ color: theme.textSecondary, fontSize: '14px' }}>· {formatTime(post.created_at)}</span>
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: '15px', lineHeight: 1.5, color: theme.text, whiteSpace: 'pre-wrap' }}>
                    {renderContent(post.content)}
                    {post.post_type === 'warning' && <WarningIcon color="#dc2626" />}
                    {post.post_type === 'awareness' && <AwarenessIcon color="#f59e0b" />}
                  </p>
                  {post.media_url && (
                    post.media_type === 'video' ? (
                      <video src={post.media_url} controls style={{ width: '100%', maxHeight: '300px', borderRadius: '12px', marginBottom: '10px' }} />
                    ) : (
                      <img src={post.media_url} alt="Post media" style={{ width: '100%', maxHeight: '300px', borderRadius: '12px', objectFit: 'cover', marginBottom: '10px' }} />
                    )
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '40px', color: theme.textSecondary, marginTop: '4px' }}>
                <span onClick={(e) => { e.stopPropagation(); toggleComments(post.id); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: expandedPost === post.id ? '#FF6B00' : theme.textSecondary }}>
                  <CommentIcon /> {post.comments_count || 0}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RepostIcon /> {post.reposts_count || 0}</span>
                <span onClick={(e) => { e.stopPropagation(); handleLikePost(post.id); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: likedPosts[post.id] ? '#dc2626' : theme.textSecondary }}>
                  <HeartIcon filled={likedPosts[post.id]} /> {post.likes_count || 0}
                </span>
              </div>
              {expandedPost === post.id && (
                <div style={{ marginTop: '12px', borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}>
                  {comments.length === 0 && (
                    <div style={{ color: theme.textSecondary, fontSize: '13px', textAlign: 'center', padding: '10px' }}>No comments yet</div>
                  )}
                  {comments.map(comment => (
                    <div key={comment.id} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: comment.profile_pic ? `url(${comment.profile_pic}) center/cover` : theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary, fontWeight: 600, fontSize: '12px', flexShrink: 0 }}>
                        {!comment.profile_pic && (comment.preferred_name || comment.full_name || '?').charAt(0)}
                      </div>
                      <div style={{ background: theme.inputBg, borderRadius: '12px', padding: '8px 12px', flex: 1, position: 'relative' }}>
                        <span style={{ fontWeight: 600, fontSize: '12px', color: theme.text }}>{comment.preferred_name || comment.full_name || 'Student'}</span>
                        <p style={{ margin: '2px 0 0', fontSize: '14px', color: theme.text }}>{comment.content}</p>
                        {comment.user_id === user.id && (
                          <button onClick={() => handleDeleteComment(comment.id, post.id)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', padding: '2px', opacity: 0.5 }}><TrashIcon /></button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '12px', flexShrink: 0 }}>
                      {!user.profile_pic && (user.full_name?.charAt(0) || 'U')}
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: theme.inputBg, borderRadius: '20px', padding: '6px 12px' }}>
                      <input type="text" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }} style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', color: theme.text, fontFamily: 'inherit' }} />
                      {commentText.trim() && (
                        <button onClick={() => handleAddComment(post.id)} style={{ background: 'none', border: 'none', color: '#FF6B00', cursor: 'pointer', padding: '4px', display: 'flex' }}><SendIcon /></button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: theme.textSecondary, fontSize: '16px' }}>{title} — coming soon</div>
  );

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
      {activeTab === 'home' ? renderHome() : renderPlaceholder(activeTab === 'projects' ? 'Projects' : activeTab === 'communities' ? 'Communities' : activeTab === 'forums' ? 'Forums' : 'Messages')}

      {/* STORY UPLOAD PREVIEW MODAL */}
      {showStoryUpload && storyPreview && (
        <div onClick={() => { setShowStoryUpload(false); setStoryFile(null); setStoryPreview(null); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => { setShowStoryUpload(false); setStoryFile(null); setStoryPreview(null); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button>
          <div style={{ color: 'white', fontSize: '16px', marginBottom: '20px', fontWeight: 600 }}>Preview Story</div>
          {storyFile?.type?.startsWith('video') ? (
            <video src={storyPreview} controls style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '12px' }} />
          ) : (
            <img src={storyPreview} alt="Story preview" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '12px', objectFit: 'contain' }} />
          )}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={() => { setShowStoryUpload(false); setStoryFile(null); setStoryPreview(null); }} style={{ padding: '14px 30px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={handleUploadStory} disabled={uploadingStory} style={{ padding: '14px 30px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: uploadingStory ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: uploadingStory ? 0.7 : 1 }}>
              {uploadingStory ? 'Uploading...' : 'Post Story'}
            </button>
          </div>
        </div>
      )}

      {/* STORY VIEWER MODAL */}
      {viewingStory && (
        <div onClick={() => { setViewingStory(null); setStoryComments([]); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => { setViewingStory(null); setStoryComments([]); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'white' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: viewingStory.profile_pic ? `url(${viewingStory.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: 'white' }}>
              {!viewingStory.profile_pic && (viewingStory.preferred_name || viewingStory.full_name || '?').charAt(0)}
            </div>
            <span style={{ fontWeight: 600, fontSize: '15px' }}>
              {viewingStory.isMine ? 'You' : (viewingStory.preferred_name || viewingStory.full_name || 'User')}
            </span>
            <span style={{ fontSize: '13px', color: '#aaa' }}>{formatTime(viewingStory.created_at)}</span>
          </div>
          {viewingStory.media_type === 'video' ? (
            <video src={viewingStory.media_url} controls style={{ maxWidth: '100%', maxHeight: '55vh', borderRadius: '12px' }} />
          ) : (
            <img src={viewingStory.media_url} alt="Story" style={{ maxWidth: '100%', maxHeight: '55vh', borderRadius: '12px', objectFit: 'contain' }} />
          )}
          <div style={{ display: 'flex', gap: '30px', marginTop: '16px', color: 'white' }}>
            <span onClick={() => handleStoryLike(viewingStory.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: storyLikes[viewingStory.id] ? '#dc2626' : 'white' }}>
              <HeartIcon filled={storyLikes[viewingStory.id]} /> {storyLikes[viewingStory.id] ? '1' : '0'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CommentIcon /> {storyComments.length}</span>
          </div>
          {/* Story Comments */}
          <div style={{ width: '100%', maxWidth: '400px', marginTop: '16px', maxHeight: '20vh', overflowY: 'auto' }}>
            {storyComments.map(comment => (
              <div key={comment.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: comment.profile_pic ? `url(${comment.profile_pic}) center/cover` : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '11px', color: 'white', flexShrink: 0 }}>
                  {!comment.profile_pic && (comment.preferred_name || comment.full_name || '?').charAt(0)}
                </div>
                <div style={{ background: '#333', borderRadius: '10px', padding: '6px 10px', flex: 1 }}>
                  <span style={{ fontWeight: 600, fontSize: '11px', color: '#ccc' }}>{comment.preferred_name || comment.full_name || 'Student'}</span>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'white' }}>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', width: '100%', maxWidth: '400px' }}>
            <input type="text" placeholder="Add a comment..." value={storyCommentText} onChange={(e) => setStoryCommentText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleStoryComment(viewingStory.id); }} style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: 'none', outline: 'none', fontSize: '13px', background: '#333', color: 'white', fontFamily: 'inherit' }} />
            {storyCommentText.trim() && (
              <button onClick={() => handleStoryComment(viewingStory.id)} style={{ background: '#FF6B00', color: 'white', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SendIcon /></button>
            )}
          </div>
        </div>
      )}

      {/* COMPOSER MODAL */}
      {showComposer && (
        <div onClick={() => { setShowComposer(false); setPostTag(null); setPostContent(''); setPostMedia([]); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', paddingTop: '60px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg, borderRadius: '20px', width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${theme.border}`, position: 'relative' }}>
              <button onClick={() => setComposerTab('post')} style={{ flex: 1, padding: '14px', background: 'none', border: 'none', color: composerTab === 'post' ? '#FF6B00' : theme.textSecondary, fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>
                Post
                {composerTab === 'post' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
              </button>
              <button onClick={() => setComposerTab('project')} style={{ flex: 1, padding: '14px', background: 'none', border: 'none', color: composerTab === 'project' ? '#FF6B00' : theme.textSecondary, fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>
                Project
                {composerTab === 'project' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
              </button>
              <button onClick={() => setComposerTab('community')} style={{ flex: 1, padding: '14px', background: 'none', border: 'none', color: composerTab === 'community' ? '#FF6B00' : theme.textSecondary, fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>
                Community
                {composerTab === 'community' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
              </button>
              <button onClick={() => { setShowComposer(false); setPostTag(null); setPostContent(''); setPostMedia([]); }} style={{ padding: '14px', background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', fontSize: '18px' }}><CloseIcon /></button>
            </div>

            {composerTab === 'post' && (
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <button onClick={() => setPostTag(postTag === 'warning' ? null : 'warning')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', border: postTag === 'warning' ? '2px solid #dc2626' : `1.5px solid ${theme.border}`, background: postTag === 'warning' ? '#fef2f2' : 'transparent', color: postTag === 'warning' ? '#dc2626' : theme.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><WarningIcon color={postTag === 'warning' ? '#dc2626' : theme.textSecondary} /> Warning</button>
                  <button onClick={() => setPostTag(postTag === 'awareness' ? null : 'awareness')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', border: postTag === 'awareness' ? '2px solid #f59e0b' : `1.5px solid ${theme.border}`, background: postTag === 'awareness' ? '#fffbeb' : 'transparent', color: postTag === 'awareness' ? '#f59e0b' : theme.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><AwarenessIcon color={postTag === 'awareness' ? '#f59e0b' : theme.textSecondary} /> Awareness</button>
                </div>
                <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="What's happening?" rows={5} style={{ width: '100%', padding: '12px 0', border: 'none', outline: 'none', fontSize: '16px', fontFamily: 'inherit', resize: 'none', background: 'transparent', color: theme.text, boxSizing: 'border-box' }} />
                {postMedia.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    {postMedia.map((url, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={url} alt="Media" style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover' }} />
                        <button onClick={() => setPostMedia(prev => prev.filter((_, j) => j !== i))} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#dc2626', color: 'white', border: 'none', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>x</button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <label style={{ cursor: 'pointer', color: theme.textSecondary, padding: '6px', display: 'flex' }}><ImageIcon /><input type="file" accept="image/*" onChange={(e) => handlePostMediaUpload(e.target.files[0])} style={{ display: 'none' }} /></label>
                    <label style={{ cursor: 'pointer', color: theme.textSecondary, padding: '6px', display: 'flex' }}><VideoIcon /><input type="file" accept="video/*" onChange={(e) => handlePostMediaUpload(e.target.files[0])} style={{ display: 'none' }} /></label>
                  </div>
                  <button onClick={handleCreatePost} disabled={posting || (!postContent.trim() && postMedia.length === 0)} style={{ padding: '10px 24px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: posting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: posting || (!postContent.trim() && postMedia.length === 0) ? 0.5 : 1 }}>{posting ? 'Posting...' : 'Post'}</button>
                </div>
              </div>
            )}

            {composerTab === 'project' && (
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '16px' }}>Start a Project</h3>
                <button onClick={() => { setShowComposer(false); navigate('/projects'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '14px 28px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '16px' }}>
                  <SmallPlusIcon /> Start a Project
                </button>
                <p style={{ color: theme.textSecondary, fontSize: '13px' }}>Create a project, add members, share links</p>
              </div>
            )}

            {composerTab === 'community' && (
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '16px' }}>Start a Community</h3>
                <button onClick={() => { setShowComposer(false); navigate('/communities'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '14px 28px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '16px' }}>
                  <SmallPlusIcon /> Start a Community
                </button>
                <p style={{ color: theme.textSecondary, fontSize: '13px' }}>Join or create communities around shared interests</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '600px', background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}>
              <Icon />
              <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;