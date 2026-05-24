import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

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

const PlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const SmallPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const FaintPlusIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const WarningIcon = ({ color = '#dc2626' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const AwarenessIcon = ({ color = '#f59e0b' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
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

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const BadgeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 11.75a29.94 29.94 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.94 29.94 0 0 0 .46-5.25 29.94 29.94 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ShieldIcon = ({ year, size = 18, color = '#C0C0C0' }) => {
  const label = year === 'Post Grad' ? 'P' : year?.replace('st','').replace('nd','').replace('rd','').replace('th','');
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span style={{ position: 'absolute', fontSize: size * 0.45, fontWeight: 700, color: color, fontFamily: 'inherit', lineHeight: 1, marginTop: '1px' }}>{label}</span>
    </span>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const token = localStorage.getItem('ujconnect_token');
  const isOwner = !userId || userId === String(currentUser.id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(false);
  const [coverPreview, setCoverPreview] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [badges, setBadges] = useState([]);
  const [fullImage, setFullImage] = useState(null);
  const [profileSection, setProfileSection] = useState('posts');

  // Avatar tap menu
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [storyViewerIndex, setStoryViewerIndex] = useState(0);

  // Highlight viewer
  const [viewingHighlight, setViewingHighlight] = useState(null);
  const [highlightStoryIndex, setHighlightStoryIndex] = useState(0);

  // Highlight create
  const [showHighlightCreate, setShowHighlightCreate] = useState(false);
  const [highlightFile, setHighlightFile] = useState(null);
  const [highlightPreview, setHighlightPreview] = useState(null);
  const [highlightTitle, setHighlightTitle] = useState('');
  const [creatingHighlight, setCreatingHighlight] = useState(false);

  // Badge create
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [badgeTitle, setBadgeTitle] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [creatingBadge, setCreatingBadge] = useState(false);
  const [viewingBadge, setViewingBadge] = useState(null);

  const [showComposer, setShowComposer] = useState(false);
  const [composerTab, setComposerTab] = useState('post');
  const [postContent, setPostContent] = useState('');
  const [postTag, setPostTag] = useState(null);
  const [postMedia, setPostMedia] = useState([]);
  const [posting, setPosting] = useState(false);

  const [coverPosX, setCoverPosX] = useState(50);
  const [coverPosY, setCoverPosY] = useState(50);
  const [coverZoom, setCoverZoom] = useState(1);
  const [avatarPosX, setAvatarPosX] = useState(50);
  const [avatarPosY, setAvatarPosY] = useState(50);
  const [avatarZoom, setAvatarZoom] = useState(1);
  const [draggingCover, setDraggingCover] = useState(false);
  const [draggingAvatar, setDraggingAvatar] = useState(false);
  const coverRef = useRef(null);
  const avatarRef = useRef(null);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  const [form, setForm] = useState({
    full_name: '', preferred_name: '', department: '', course: '', year: '', bio: '', skills: '',
    cover_photo: '', profile_pic: '',
    cover_position_x: '50', cover_position_y: '50', cover_zoom: '1',
    profile_position_x: '50', profile_position_y: '50', profile_zoom: '1',
    dark_mode: 'false', tiktok: '', instagram: '', facebook: '', youtube: '', linkedin: ''
  });

  const departments = [
    'Accountancy', 'Applied Information Systems', 'Business Management',
    'Economics and Econometrics', 'Finance & Investment Management',
    'Information & Knowledge Management', 'Public Management & Governance',
    'Hospitality', 'Commercial Accountancy', 'Industrial Psychology',
    'Marketing', 'Transport & Supply Chain Management', 'Tourism'
  ];
  const years = ['1st', '2nd', '3rd', '4th', 'Post Grad'];
  const socialLinks = [
    { key: 'tiktok', icon: TikTokIcon, label: 'TikTok' },
    { key: 'instagram', icon: InstagramIcon, label: 'Instagram' },
    { key: 'facebook', icon: FacebookIcon, label: 'Facebook' },
    { key: 'youtube', icon: YouTubeIcon, label: 'YouTube' },
    { key: 'linkedin', icon: LinkedInIcon, label: 'LinkedIn' },
  ];

  useEffect(() => { fetchProfile(); }, [userId]);

  const getFacultyColor = (dept) => {
    const cbeDepts = ['Applied Information Systems', 'Business Management', 'Economics and Econometrics', 'Finance & Investment Management', 'Information & Knowledge Management', 'Public Management & Governance', 'Hospitality', 'Commercial Accountancy', 'Industrial Psychology', 'Marketing', 'Transport & Supply Chain Management', 'Tourism', 'Accountancy'];
    if (cbeDepts.some(d => dept && dept.includes(d))) return '#2563eb';
    if (dept && dept.includes('Law')) return '#dc2626';
    if (dept && dept.includes('Science')) return '#16a34a';
    if (dept && dept.includes('Humanities')) return '#9333ea';
    if (dept && dept.includes('Health')) return '#ea580c';
    if (dept && dept.includes('Engineering')) return '#ca8a04';
    return '#666';
  };

  const getFacultyGradient = (dept) => `linear-gradient(135deg, ${getFacultyColor(dept)}, ${getFacultyColor(dept)}88)`;

  const formatTime = (dateString) => {
    const now = new Date(); const date = new Date(dateString);
    const diffMins = Math.floor((now - date) / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  const fetchProfile = async () => {
    try {
      const id = isOwner ? currentUser.id : userId;
      const { data } = await axios.get(`${API_URL}/api/users/${id}`);
      setUser(data);
      setDarkMode(data.dark_mode === 'true');
      setForm({
        full_name: data.full_name || '', preferred_name: data.preferred_name || '',
        department: data.department || '', course: data.course || '', year: data.year || '',
        bio: data.bio || '', skills: data.skills ? data.skills.join(', ') : '',
        cover_photo: data.cover_photo || '', profile_pic: data.profile_pic || '',
        cover_position_x: data.cover_position_x || '50', cover_position_y: data.cover_position_y || '50',
        cover_zoom: data.cover_zoom || '1',
        profile_position_x: data.profile_position_x || '50', profile_position_y: data.profile_position_y || '50',
        profile_zoom: data.profile_zoom || '1', dark_mode: data.dark_mode || 'false',
        tiktok: data.tiktok || '', instagram: data.instagram || '',
        facebook: data.facebook || '', youtube: data.youtube || '', linkedin: data.linkedin || ''
      });
      if (data.cover_position_x) setCoverPosX(parseFloat(data.cover_position_x));
      if (data.cover_position_y) setCoverPosY(parseFloat(data.cover_position_y));
      if (data.cover_zoom) setCoverZoom(parseFloat(data.cover_zoom));
      if (data.profile_position_x) setAvatarPosX(parseFloat(data.profile_position_x));
      if (data.profile_position_y) setAvatarPosY(parseFloat(data.profile_position_y));
      if (data.profile_zoom) setAvatarZoom(parseFloat(data.profile_zoom));
      fetchUserPosts(data.id);
      fetchUserStories(data.id);
      fetchHighlights(data.id);
      fetchBadges(data.id);
    } catch (err) { setError('Could not load profile'); } finally { setLoading(false); }
  };

  const fetchUserPosts = async (uid) => {
    try { const { data } = await axios.get(`${API_URL}/api/posts?user_id=${uid}`); setUserPosts(data || []); } catch (err) {}
  };

  const fetchUserStories = async (uid) => {
    try { const { data } = await axios.get(`${API_URL}/api/stories?user_id=${uid}`); setUserStories(data || []); } catch (err) {}
  };

  const fetchHighlights = async (uid) => {
    try { const { data } = await axios.get(`${API_URL}/api/highlights/user/${uid}`); setHighlights(data || []); } catch (err) {}
  };

  const fetchBadges = async (uid) => {
    try { const { data } = await axios.get(`${API_URL}/api/badges/user/${uid}`); setBadges(data || []); } catch (err) {}
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try { await axios.delete(`${API_URL}/api/posts/${postId}`); setUserPosts(prev => prev.filter(p => p.id !== postId)); } catch (err) { setError('Failed to delete post'); }
  };

  const handleDeleteStory = async (storyId) => {
    if (!window.confirm('Delete this story?')) return;
    try { await axios.delete(`${API_URL}/api/stories/${storyId}`); setUserStories(prev => prev.filter(s => s.id !== storyId)); } catch (err) { setError('Failed to delete story'); }
  };

  const handleDeleteHighlight = async (highlightId) => {
    if (!window.confirm('Delete this highlight?')) return;
    try { await axios.delete(`${API_URL}/api/highlights/${highlightId}`); setHighlights(prev => prev.filter(h => h.id !== highlightId)); } catch (err) { setError('Failed to delete highlight'); }
  };

  const handleDeleteBadge = async (badgeId) => {
    if (!window.confirm('Delete this badge?')) return;
    try { await axios.delete(`${API_URL}/api/badges/${badgeId}`); setBadges(prev => prev.filter(b => b.id !== badgeId)); } catch (err) { setError('Failed to delete badge'); }
  };

  const handleHighlightFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHighlightFile(file);
    const reader = new FileReader();
    reader.onload = () => setHighlightPreview(reader.result);
    reader.readAsDataURL(file);
    setShowHighlightCreate(true);
  };

  const handleCreateHighlight = async () => {
    if (!highlightFile || !highlightTitle.trim()) return;
    setCreatingHighlight(true);
    const fd = new FormData(); fd.append('file', highlightFile);
    try {
      const uploadRes = await axios.post(`${API_URL}/api/upload`, fd);
      const isVideo = highlightFile.type.startsWith('video');
      const { data } = await axios.post(`${API_URL}/api/highlights`, { user_id: currentUser.id, title: highlightTitle.trim() });
      await axios.post(`${API_URL}/api/highlights/${data.id}/items`, { media_url: uploadRes.data.url, media_type: isVideo ? 'video' : 'image' });
      setHighlightFile(null); setHighlightPreview(null); setHighlightTitle(''); setShowHighlightCreate(false);
      fetchHighlights(currentUser.id);
    } catch (err) { setError('Failed to create highlight'); } finally { setCreatingHighlight(false); }
  };

  const handleCreateBadge = async () => {
    if (!badgeTitle.trim()) return;
    setCreatingBadge(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/badges`, {
        user_id: currentUser.id,
        title: badgeTitle.trim(),
        description: badgeDescription.trim()
      });
      setBadges(prev => [data, ...prev]);
      setBadgeTitle(''); setBadgeDescription(''); setShowBadgeModal(false);
    } catch (err) { setError('Failed to create badge'); } finally { setCreatingBadge(false); }
  };

  const handleLikePost = async (postId) => {
    try { const { data } = await axios.post(`${API_URL}/api/posts/${postId}/like`, { user_id: currentUser.id }); setUserPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: data.liked ? p.likes_count + 1 : p.likes_count - 1 } : p)); } catch (err) {}
  };

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      const skillsArray = form.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      const saveData = { ...form, skills: skillsArray, cover_position_x: `${Math.round(coverPosX)}`, cover_position_y: `${Math.round(coverPosY)}`, cover_zoom: `${coverZoom}`, profile_position_x: `${Math.round(avatarPosX)}`, profile_position_y: `${Math.round(avatarPosY)}`, profile_zoom: `${avatarZoom}`, dark_mode: darkMode ? 'true' : 'false' };
      const { data } = await axios.put(`${API_URL}/api/users/${currentUser.id}`, saveData, { headers: { Authorization: `Bearer ${token}` } });
      setUser(data); localStorage.setItem('ujconnect_user', JSON.stringify(data));
      setEditing(false); setShowAvatarEditor(false);
    } catch (err) { setError('Failed to save.'); } finally { setSaving(false); }
  };

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };
  const handleFileUpload = async (file, field) => {
    if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    try { const { data } = await axios.post(`${API_URL}/api/upload`, fd); setForm(prev => ({ ...prev, [field]: data.url })); if (field === 'profile_pic') { setAvatarPosX(50); setAvatarPosY(50); setAvatarZoom(1); setShowAvatarEditor(true); } if (field === 'cover_photo') { setCoverPosX(50); setCoverPosY(50); setCoverZoom(1); } } catch (err) { setError('Failed to upload image'); }
  };
  const handlePostMediaUpload = async (file) => {
    if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    try { const { data } = await axios.post(`${API_URL}/api/upload`, fd); setPostMedia(prev => [...prev, data.url]); } catch (err) { setError('Failed to upload media'); }
  };
  const handleCreatePost = async () => {
    if (!postContent.trim() && postMedia.length === 0) return;
    setPosting(true);
    try { const { data } = await axios.post(`${API_URL}/api/posts`, { user_id: currentUser.id, content: postContent, media_url: postMedia[0] || null, media_type: postMedia.length > 0 ? 'image' : null, post_type: postTag || 'post' }); setUserPosts(prev => [data, ...prev]); setPostContent(''); setPostMedia([]); setPostTag(null); setShowComposer(false); } catch (err) { setError('Failed to create post'); } finally { setPosting(false); }
  };

  const handleCoverDragStart = (e) => {
    e.preventDefault(); setDraggingCover(true);
    const startX = e.clientX || e.touches?.[0]?.clientX, startY = e.clientY || e.touches?.[0]?.clientY, startPX = coverPosX, startPY = coverPosY;
    const rect = coverRef.current?.getBoundingClientRect();
    const onMove = (ev) => { const cx = ev.clientX || ev.touches?.[0]?.clientX, cy = ev.clientY || ev.touches?.[0]?.clientY; setCoverPosX(Math.max(0, Math.min(100, startPX + ((cx - startX) / rect.width) * 100))); setCoverPosY(Math.max(0, Math.min(100, startPY + ((cy - startY) / rect.height) * 100))); };
    const onEnd = () => { setDraggingCover(false); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onEnd); document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); };
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onEnd); document.addEventListener('touchmove', onMove); document.addEventListener('touchend', onEnd);
  };
  const handleAvatarDragStart = (e) => {
    e.preventDefault(); setDraggingAvatar(true);
    const startX = e.clientX || e.touches?.[0]?.clientX, startY = e.clientY || e.touches?.[0]?.clientY, startPX = avatarPosX, startPY = avatarPosY;
    const rect = avatarRef.current?.getBoundingClientRect();
    const onMove = (ev) => { const cx = ev.clientX || ev.touches?.[0]?.clientX, cy = ev.clientY || ev.touches?.[0]?.clientY; setAvatarPosX(Math.max(0, Math.min(100, startPX + ((cx - startX) / rect.width) * 100))); setAvatarPosY(Math.max(0, Math.min(100, startPY + ((cy - startY) / rect.height) * 100))); };
    const onEnd = () => { setDraggingAvatar(false); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onEnd); document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onEnd); };
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onEnd); document.addEventListener('touchmove', onMove); document.addEventListener('touchend', onEnd);
  };

  const renderContent = (text) => {
    if (!text) return null;
    return text.split(/(#\w+)/g).map((part, i) => part.startsWith('#') ? <span key={i} style={{ color: '#4da6ff', fontWeight: 500 }}>{part}</span> : part);
  };

  const handleBack = () => navigate(-1);
  const handleLogout = () => { localStorage.clear(); sessionStorage.clear(); window.location.href = '/'; };
  const handleMessage = () => navigate('/messages', { state: { userId: user.id, name: user.preferred_name || user.full_name } });
  const getShieldColor = (year) => year === 'Post Grad' ? '#D4AF37' : '#C0C0C0';

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];
  const handleTabClick = (tabId) => { if (tabId === 'home') navigate('/dashboard'); };

  const theme = {
    bg: darkMode ? '#000' : '#fff', text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888', border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f5f5f5', inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
    inputBorder: darkMode ? '#333' : '#e2e8f0',
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '30px', height: '30px', border: `3px solid ${darkMode ? '#333' : '#eee'}`, borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  const displayName = user?.preferred_name || user?.full_name || 'Student';
  const currentCover = form.cover_photo || user?.cover_photo;
  const currentAvatar = form.profile_pic || user?.profile_pic;
  const hasSocialLinks = socialLinks.some(s => user?.[s.key]);
  const hasStories = userStories.length > 0;

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: '600px', margin: '0 auto', position: 'relative', paddingBottom: '80px' }}>

      {/* COVER PHOTO */}
      <div ref={coverRef} style={{ width: '100%', height: '160px', background: currentCover ? `url(${currentCover})` : 'linear-gradient(135deg, #e8e8e8, #d5d5d5)', backgroundPosition: currentCover ? `${coverPosX}% ${coverPosY}%` : 'center', backgroundSize: currentCover ? `${coverZoom * 100}%` : 'cover', backgroundRepeat: 'no-repeat', position: 'relative', overflow: 'hidden', cursor: !editing && currentCover ? 'pointer' : editing && currentCover ? (draggingCover ? 'grabbing' : 'grab') : 'default' }}
        onMouseDown={editing && currentCover ? handleCoverDragStart : undefined} onTouchStart={editing && currentCover ? handleCoverDragStart : undefined}
        onClick={() => { if (!editing && currentCover) setCoverPreview(true); }}>
        {editing && currentCover && (
          <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', padding: '6px 14px' }}>
            <span style={{ color: 'white', fontSize: '11px' }}>Drag</span>
            <input type="range" min="1" max="3" step="0.1" value={coverZoom} onChange={(e) => setCoverZoom(parseFloat(e.target.value))} style={{ width: '60px', accentColor: 'white', cursor: 'pointer' }} />
            <span style={{ color: 'white', fontSize: '11px' }}>Zoom</span>
          </div>
        )}
        {editing && !currentCover && (<><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'cover_photo')} style={{ display: 'none' }} id="cover-upload" /><label htmlFor="cover-upload" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}><FaintPlusIcon size={40} /></label></>)}
        {editing && currentCover && (<><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'cover_photo')} style={{ display: 'none' }} id="cover-replace" /><label htmlFor="cover-replace" style={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer', color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, fontSize: '14px' }}>+</label></>)}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <button onClick={handleBack} style={{ background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer', color: 'white', padding: '8px', borderRadius: '50%', display: 'flex' }}><ArrowLeftIcon /></button>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>{displayName}{user?.year && <ShieldIcon year={user.year} size={18} color={getShieldColor(user.year)} />}</h2>
          {isOwner && !editing && <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'rgba(0,0,0,0.3)', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>Logout</button>}
          {!isOwner && <button onClick={handleMessage} style={{ marginLeft: 'auto', background: '#FF6B00', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Message</button>}
        </div>
      </div>

      {/* Cover Preview */}
      {coverPreview && currentCover && (
        <div onClick={() => setCoverPreview(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => setCoverPreview(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button>
          <img src={currentCover} alt="Cover" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px', objectFit: 'contain' }} />
        </div>
      )}

      {/* Full Image Modal */}
      {fullImage && (
        <div onClick={() => setFullImage(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => setFullImage(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button>
          <img src={fullImage} alt="Full" style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px', objectFit: 'contain' }} />
        </div>
      )}

      {/* Avatar Editor */}
      {showAvatarEditor && editing && currentAvatar && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ color: 'white', fontSize: '14px', marginBottom: '20px' }}>Drag to position, use slider to zoom</div>
          <div ref={avatarRef} style={{ width: '280px', height: '280px', borderRadius: '50%', background: `url(${currentAvatar})`, backgroundPosition: `${avatarPosX}% ${avatarPosY}%`, backgroundSize: `${avatarZoom * 100}%`, backgroundRepeat: 'no-repeat', cursor: draggingAvatar ? 'grabbing' : 'grab', border: '2px solid rgba(255,255,255,0.3)', overflow: 'hidden' }} onMouseDown={handleAvatarDragStart} onTouchStart={handleAvatarDragStart} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', color: 'white' }}><span style={{ fontSize: '13px' }}>Zoom</span><input type="range" min="1" max="4" step="0.1" value={avatarZoom} onChange={(e) => setAvatarZoom(parseFloat(e.target.value))} style={{ width: '150px', accentColor: '#FF6B00' }} /></div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={() => setShowAvatarEditor(false)} style={{ padding: '12px 30px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            <button onClick={() => setShowAvatarEditor(false)} style={{ padding: '12px 30px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
          </div>
        </div>
      )}

      {/* Avatar Tap Menu */}
      {showAvatarMenu && (
        <div onClick={() => setShowAvatarMenu(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg, borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
            <button onClick={() => { setShowAvatarMenu(false); setAvatarPreview(true); }} style={{ width: '100%', padding: '14px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600, color: theme.text, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '10px', textAlign: 'left' }}>View Profile Picture</button>
            {hasStories && (
              <button onClick={() => { setShowAvatarMenu(false); setShowStoryViewer(true); setStoryViewerIndex(0); }} style={{ width: '100%', padding: '14px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600, color: theme.text, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '10px', textAlign: 'left' }}>View Story</button>
            )}
            <button onClick={() => setShowAvatarMenu(false)} style={{ width: '100%', padding: '12px', background: 'none', border: 'none', color: theme.textSecondary, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Story Viewer Modal */}
      {showStoryViewer && hasStories && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setShowStoryViewer(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5, width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CloseIcon /></button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            {userStories[storyViewerIndex]?.media_type === 'video' ? (
              <video src={userStories[storyViewerIndex].media_url} controls autoPlay style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px' }} />
            ) : (
              <img src={userStories[storyViewerIndex].media_url} alt="Story" style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px' }} />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '16px', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
            <button onClick={() => setStoryViewerIndex(prev => Math.max(0, prev - 1))} disabled={storyViewerIndex === 0} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', opacity: storyViewerIndex === 0 ? 0.3 : 1 }}>Previous</button>
            <button onClick={() => setStoryViewerIndex(prev => Math.min(userStories.length - 1, prev + 1))} disabled={storyViewerIndex >= userStories.length - 1} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', opacity: storyViewerIndex >= userStories.length - 1 ? 0.3 : 1 }}>Next</button>
          </div>
        </div>
      )}

      {/* Highlight Viewer */}
      {viewingHighlight && viewingHighlight.items && viewingHighlight.items.length > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setViewingHighlight(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5, width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CloseIcon /></button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', paddingTop: '60px' }}>
            <span style={{ color: 'white', fontWeight: 600, fontSize: '16px' }}>{viewingHighlight.title}</span>
            <span style={{ color: '#aaa', fontSize: '13px', marginLeft: '10px' }}>{highlightStoryIndex + 1} / {viewingHighlight.items.length}</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            {viewingHighlight.items[highlightStoryIndex]?.media_type === 'video' ? (
              <video src={viewingHighlight.items[highlightStoryIndex].media_url} controls autoPlay style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '12px' }} />
            ) : (
              <img src={viewingHighlight.items[highlightStoryIndex].media_url} alt="Highlight" style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '12px' }} />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '16px', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
            <button onClick={() => setHighlightStoryIndex(prev => Math.max(0, prev - 1))} disabled={highlightStoryIndex === 0} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', opacity: highlightStoryIndex === 0 ? 0.3 : 1 }}>Previous</button>
            <button onClick={() => setHighlightStoryIndex(prev => Math.min((viewingHighlight.items?.length || 1) - 1, prev + 1))} disabled={highlightStoryIndex >= (viewingHighlight.items?.length || 1) - 1} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', opacity: highlightStoryIndex >= (viewingHighlight.items?.length || 1) - 1 ? 0.3 : 1 }}>Next</button>
          </div>
        </div>
      )}

      {/* Highlight Create Modal */}
      {showHighlightCreate && highlightPreview && (
        <div onClick={() => { setShowHighlightCreate(false); setHighlightFile(null); setHighlightPreview(null); setHighlightTitle(''); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg, borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '16px', textAlign: 'center' }}>New Highlight</h3>
            <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {highlightFile?.type?.startsWith('video') ? (
                <video src={highlightPreview} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={highlightPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            <input type="text" placeholder="Highlight name" value={highlightTitle} onChange={(e) => setHighlightTitle(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text, marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setShowHighlightCreate(false); setHighlightFile(null); setHighlightPreview(null); setHighlightTitle(''); }} style={{ flex: 1, padding: '12px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.textSecondary }}>Cancel</button>
              <button onClick={handleCreateHighlight} disabled={creatingHighlight || !highlightTitle.trim()} style={{ flex: 1, padding: '12px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: creatingHighlight ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: creatingHighlight || !highlightTitle.trim() ? 0.5 : 1 }}>{creatingHighlight ? 'Creating...' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {viewingBadge && (
        <div onClick={() => setViewingBadge(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg, borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #F0C75E)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <BadgeIcon />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: theme.text, marginBottom: '8px' }}>{viewingBadge.title}</h3>
            {viewingBadge.description && (
              <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: 1.5, marginBottom: '20px' }}>{viewingBadge.description}</p>
            )}
            <button onClick={() => setViewingBadge(null)} style={{ padding: '12px 30px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.text }}>Close</button>
          </div>
        </div>
      )}

      {/* Badge Create Modal */}
      {showBadgeModal && (
        <div onClick={() => setShowBadgeModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg, borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '16px', textAlign: 'center' }}>Add Achievement Badge</h3>
            <input type="text" placeholder="e.g. Chess Master 2022" value={badgeTitle} onChange={(e) => setBadgeTitle(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text, marginBottom: '12px' }} />
            <textarea placeholder="Description (optional)" value={badgeDescription} onChange={(e) => setBadgeDescription(e.target.value)} rows={3} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', background: theme.inputBg, color: theme.text, marginBottom: '16px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setShowBadgeModal(false); setBadgeTitle(''); setBadgeDescription(''); }} style={{ flex: 1, padding: '12px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.textSecondary }}>Cancel</button>
              <button onClick={handleCreateBadge} disabled={creatingBadge || !badgeTitle.trim()} style={{ flex: 1, padding: '12px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: creatingBadge ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: creatingBadge || !badgeTitle.trim() ? 0.5 : 1 }}>{creatingBadge ? 'Adding...' : 'Add Badge'}</button>
            </div>
          </div>
        </div>
      )}

      {/* COMPOSER MODAL */}
      {showComposer && (
        <div onClick={() => { setShowComposer(false); setPostTag(null); setPostContent(''); setPostMedia([]); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', paddingTop: '60px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: theme.bg, borderRadius: '20px', width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${theme.border}`, position: 'relative' }}>
              {['post', 'project', 'community'].map(tab => (
                <button key={tab} onClick={() => setComposerTab(tab)} style={{ flex: 1, padding: '14px', background: 'none', border: 'none', color: composerTab === tab ? '#FF6B00' : theme.textSecondary, fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {composerTab === tab && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
                </button>
              ))}
              <button onClick={() => { setShowComposer(false); setPostTag(null); setPostContent(''); setPostMedia([]); }} style={{ padding: '14px', background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', fontSize: '18px' }}><CloseIcon /></button>
            </div>
            {composerTab === 'post' && (
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <button onClick={() => setPostTag(postTag === 'warning' ? null : 'warning')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', border: postTag === 'warning' ? '2px solid #dc2626' : `1.5px solid ${theme.border}`, background: postTag === 'warning' ? '#fef2f2' : 'transparent', color: postTag === 'warning' ? '#dc2626' : theme.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><WarningIcon color={postTag === 'warning' ? '#dc2626' : theme.textSecondary} /> Warning</button>
                  <button onClick={() => setPostTag(postTag === 'awareness' ? null : 'awareness')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', border: postTag === 'awareness' ? '2px solid #f59e0b' : `1.5px solid ${theme.border}`, background: postTag === 'awareness' ? '#fffbeb' : 'transparent', color: postTag === 'awareness' ? '#f59e0b' : theme.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><AwarenessIcon color={postTag === 'awareness' ? '#f59e0b' : theme.textSecondary} /> Awareness</button>
                </div>
                <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="What's happening?" rows={5} style={{ width: '100%', padding: '12px 0', border: 'none', outline: 'none', fontSize: '16px', fontFamily: 'inherit', resize: 'none', background: 'transparent', color: theme.text, boxSizing: 'border-box' }} />
                {postMedia.length > 0 && (<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>{postMedia.map((url, i) => (<div key={i} style={{ position: 'relative' }}><img src={url} alt="Media" style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover' }} /><button onClick={() => setPostMedia(prev => prev.filter((_, j) => j !== i))} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#dc2626', color: 'white', border: 'none', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>x</button></div>))}</div>)}
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
                <button onClick={() => { setShowComposer(false); navigate('/projects'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '14px 28px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '16px' }}><SmallPlusIcon /> Start a Project</button>
                <p style={{ color: theme.textSecondary, fontSize: '13px' }}>Create a project, add members, share links</p>
              </div>
            )}
            {composerTab === 'community' && (
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.text, marginBottom: '16px' }}>Start a Community</h3>
                <button onClick={() => { setShowComposer(false); navigate('/communities'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '14px 28px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '16px' }}><SmallPlusIcon /> Start a Community</button>
                <p style={{ color: theme.textSecondary, fontSize: '13px' }}>Join or create communities around shared interests</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROFILE CONTENT */}
      <div style={{ padding: '0 20px', position: 'relative' }}>
        {/* Avatar with story ring */}
        <div style={{ width: '96px', height: '96px', borderRadius: '50%', padding: hasStories ? '3px' : '0', background: hasStories ? getFacultyGradient(user?.department) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-48px', position: 'relative', zIndex: 5 }}>
          <div onClick={() => { if (!editing) setShowAvatarMenu(true); }} style={{ width: hasStories ? '90px' : '96px', height: hasStories ? '90px' : '96px', borderRadius: '50%', overflow: 'hidden', cursor: !editing ? 'pointer' : 'default', background: currentAvatar ? `url(${currentAvatar})` : 'linear-gradient(135deg, #FF6B00, #FF8C42)', backgroundPosition: currentAvatar ? `${avatarPosX}% ${avatarPosY}%` : 'center', backgroundSize: currentAvatar ? `${avatarZoom * 100}%` : 'cover', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '38px', border: `4px solid ${theme.bg}` }}>
            {!currentAvatar && displayName.charAt(0)}
            {editing && !currentAvatar && (<><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'profile_pic')} style={{ display: 'none' }} id="avatar-upload" /><label htmlFor="avatar-upload" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.8)' }}><FaintPlusIcon size={36} /></label></>)}
            {editing && currentAvatar && (<><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], 'profile_pic')} style={{ display: 'none' }} id="avatar-replace" /><label htmlFor="avatar-replace" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', color: 'rgba(255,255,255,0.6)' }}><FaintPlusIcon size={28} /></label><button onClick={() => setShowAvatarEditor(true)} style={{ position: 'absolute', bottom: '0', left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '4px', fontSize: '10px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}>Edit</button></>)}
          </div>
        </div>

        {/* Edit profile button */}
        {isOwner && !editing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-40px', marginBottom: '0px' }}>
            <button onClick={() => setEditing(true)} style={{ background: 'none', border: `1.5px solid ${theme.border}`, padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, color: theme.textSecondary, cursor: 'pointer', fontFamily: 'inherit' }}>Edit profile</button>
          </div>
        )}

        {/* Name + Shield */}
        <div style={{ marginTop: isOwner && !editing ? '8px' : '12px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 2px', display: 'flex', alignItems: 'center', gap: '8px', color: theme.text }}>{displayName}{user?.year && <ShieldIcon year={user.year} size={22} color={getShieldColor(user.year)} />}</h2>
          {user?.preferred_name && user?.full_name && <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 8px' }}>{user.full_name}</p>}
        </div>

        {/* Bio */}
        {user?.bio && !editing && <p style={{ fontSize: '14px', lineHeight: 1.5, color: darkMode ? '#aaa' : '#555', marginBottom: '20px' }}>{user.bio}</p>}

        {/* Social Links */}
        {hasSocialLinks && !editing && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {socialLinks.map(s => user?.[s.key] && (
              <a key={s.key} href={user[s.key]} target="_blank" rel="noopener noreferrer" style={{ color: theme.textSecondary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', padding: '6px 12px', border: `1px solid ${theme.border}`, borderRadius: '20px' }}><s.icon /> <span>{s.label}</span></a>
            ))}
          </div>
        )}

        {/* Department + Course tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {user?.department && <span style={{ background: theme.cardBg, padding: '6px 14px', borderRadius: '20px', fontSize: '14px', color: theme.textSecondary, fontWeight: 500 }}>{user.department}</span>}
          {user?.course && <span style={{ background: theme.cardBg, padding: '5px 12px', borderRadius: '20px', fontSize: '11px', color: theme.textSecondary, fontWeight: 400 }}>{user.course}</span>}
        </div>

        {/* Skills */}
        {user?.skills && user.skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: theme.text, marginBottom: '10px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {user.skills.map((skill, i) => <span key={i} style={{ background: '#FFF7ED', color: '#FF6B00', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500 }}>{skill}</span>)}
            </div>
          </div>
        )}

        {/* Achievements Badges */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: theme.text, margin: 0 }}>Achievements</h3>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', alignItems: 'center' }}>
            {badges.map(badge => (
              <div key={badge.id} style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }} onClick={() => setViewingBadge(badge)}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #F0C75E)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${theme.border}` }}>
                  <BadgeIcon />
                </div>
                <span style={{ fontSize: '10px', color: theme.textSecondary, display: 'block', textAlign: 'center', marginTop: '4px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{badge.title}</span>
                {isOwner && (
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteBadge(badge.id); }} style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', fontSize: '10px' }}><TrashIcon /></button>
                )}
              </div>
            ))}
            {isOwner && (
              <div onClick={() => setShowBadgeModal(true)} style={{ flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: theme.cardBg, border: `1px dashed ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '22px', color: theme.textSecondary, fontWeight: 300 }}>+</span>
                </div>
                <span style={{ fontSize: '10px', color: theme.textSecondary, display: 'block', textAlign: 'center', marginTop: '4px' }}>Add</span>
              </div>
            )}
          </div>
        </div>

        {/* Highlights Section */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: theme.text, margin: 0 }}>Highlights</h3>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {highlights.map(highlight => (
              <div key={highlight.id} style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }} onClick={() => { setHighlightStoryIndex(0); setViewingHighlight(highlight); }}>
                <div style={{ width: '100px', height: '130px', borderRadius: '12px', overflow: 'hidden', background: highlight.cover_media ? `url(${highlight.cover_media}) center/cover` : theme.cardBg, border: `1px solid ${theme.border}` }}>
                  {!highlight.cover_media && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <span style={{ fontSize: '24px', color: theme.textSecondary }}>+</span>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '11px', color: theme.textSecondary, display: 'block', textAlign: 'center', marginTop: '4px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{highlight.title}</span>
                {isOwner && (
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteHighlight(highlight.id); }} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}><TrashIcon /></button>
                )}
              </div>
            ))}
            {isOwner && (
              <div onClick={() => document.getElementById('highlight-file-input').click()} style={{ flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ width: '100px', height: '130px', borderRadius: '12px', background: theme.cardBg, border: `1px dashed ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '28px', color: theme.textSecondary, fontWeight: 300 }}>+</span>
                </div>
                <span style={{ fontSize: '11px', color: theme.textSecondary, display: 'block', textAlign: 'center', marginTop: '4px' }}>New</span>
              </div>
            )}
            <input id="highlight-file-input" type="file" accept="image/*,video/*" onChange={handleHighlightFileSelect} style={{ display: 'none' }} />
          </div>
        </div>

        {error && <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}` }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme.text }}>Dark mode</span>
              <button onClick={() => setDarkMode(!darkMode)} style={{ width: '48px', height: '26px', borderRadius: '13px', background: darkMode ? '#FF6B00' : '#d1d5db', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', padding: 0 }}><span style={{ position: 'absolute', top: '3px', left: darkMode ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} /></button>
            </div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Full Name (optional)</label><input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Your legal name" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} /></div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Preferred Name</label><input type="text" name="preferred_name" value={form.preferred_name} onChange={handleChange} placeholder="What should we call you?" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} /></div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Year</label><select name="year" value={form.year} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', background: theme.inputBg, color: theme.text, boxSizing: 'border-box' }}><option value="">Select year</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Department</label><select name="department" value={form.department} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', background: theme.inputBg, color: theme.text, boxSizing: 'border-box' }}><option value="">Select department</option>{departments.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Course</label><input type="text" name="course" value={form.course} onChange={handleChange} placeholder="e.g. BCom Information Management" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} /></div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Bio</label><textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Tell us about yourself..." style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} /></div>
            <div><label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '4px' }}>Skills</label><input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="HTML, CSS, React, Python" style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} /><p style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>Separate with commas</p></div>
            <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}><p style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, marginBottom: '12px' }}>Social Links (optional)</p>{socialLinks.map(s => (<div key={s.key} style={{ marginBottom: '10px' }}><label style={{ fontSize: '12px', fontWeight: 500, color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><s.icon /> {s.label}</label><input type="url" name={s.key} value={form[s.key]} onChange={handleChange} placeholder={`Your ${s.label} URL`} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.inputBorder}`, borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} /></div>))}</div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button onClick={() => { setEditing(false); setForm(prev => ({ ...prev, full_name: user.full_name || '', preferred_name: user.preferred_name || '', department: user.department || '', course: user.course || '', year: user.year || '', bio: user.bio || '', skills: user.skills ? user.skills.join(', ') : '', cover_photo: user.cover_photo || '', profile_pic: user.profile_pic || '', cover_position_x: user.cover_position_x || '50', cover_position_y: user.cover_position_y || '50', cover_zoom: user.cover_zoom || '1', profile_position_x: user.profile_position_x || '50', profile_position_y: user.profile_position_y || '50', profile_zoom: user.profile_zoom || '1', dark_mode: user.dark_mode || 'false', tiktok: user.tiktok || '', instagram: user.instagram || '', facebook: user.facebook || '', youtube: user.youtube || '', linkedin: user.linkedin || '' })); setDarkMode(user.dark_mode === 'true'); setShowAvatarEditor(false); }} style={{ flex: 1, padding: '13px', background: theme.cardBg, border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.textSecondary }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '13px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        ) : (
          <>
            {/* Section Tabs */}
            <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '20px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', marginBottom: '20px' }}>
                <button onClick={() => setProfileSection('posts')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 8px 0', fontFamily: 'inherit', position: 'relative', textAlign: 'center' }}>
                  <strong style={{ color: profileSection === 'posts' ? '#FF6B00' : theme.text, display: 'block', fontSize: '16px' }}>{userPosts.length}</strong>
                  <span style={{ color: profileSection === 'posts' ? '#FF6B00' : theme.textSecondary, fontSize: '12px', fontWeight: profileSection === 'posts' ? 600 : 400 }}>Posts</span>
                  {profileSection === 'posts' && <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
                </button>
                <button onClick={() => { setProfileSection('projects'); navigate('/projects'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 8px 0', fontFamily: 'inherit', position: 'relative', textAlign: 'center' }}>
                  <strong style={{ color: profileSection === 'projects' ? '#FF6B00' : theme.text, display: 'block', fontSize: '16px' }}>0</strong>
                  <span style={{ color: profileSection === 'projects' ? '#FF6B00' : theme.textSecondary, fontSize: '12px', fontWeight: profileSection === 'projects' ? 600 : 400 }}>Projects</span>
                  {profileSection === 'projects' && <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
                </button>
                <button onClick={() => { setProfileSection('communities'); navigate('/communities'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 8px 0', fontFamily: 'inherit', position: 'relative', textAlign: 'center' }}>
                  <strong style={{ color: profileSection === 'communities' ? '#FF6B00' : theme.text, display: 'block', fontSize: '16px' }}>0</strong>
                  <span style={{ color: profileSection === 'communities' ? '#FF6B00' : theme.textSecondary, fontSize: '12px', fontWeight: profileSection === 'communities' ? 600 : 400 }}>Communities</span>
                  {profileSection === 'communities' && <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', background: '#FF6B00', borderRadius: '1px' }} />}
                </button>
              </div>

              {profileSection === 'posts' && (
                <>
                  {userPosts.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      {userPosts.map(post => (
                        <div key={post.id} style={{ padding: '16px 0', borderBottom: `1px solid ${theme.border}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              {post.post_type === 'warning' && <WarningIcon color="#dc2626" />}
                              {post.post_type === 'awareness' && <AwarenessIcon color="#f59e0b" />}
                              <span style={{ fontSize: '13px', color: theme.textSecondary }}>{formatTime(post.created_at)}</span>
                            </div>
                            {isOwner && <button onClick={() => handleDeletePost(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, padding: '4px', opacity: 0.6 }}><TrashIcon /></button>}
                          </div>
                          <p style={{ margin: '0 0 10px', fontSize: '15px', lineHeight: 1.5, color: theme.text, whiteSpace: 'pre-wrap' }}>{renderContent(post.content)}</p>
                          {post.media_url && <img src={post.media_url} alt="Post media" onClick={() => setFullImage(post.media_url)} style={{ width: '100%', maxHeight: '300px', borderRadius: '12px', objectFit: 'cover', marginBottom: '10px', cursor: 'pointer' }} />}
                          <div style={{ display: 'flex', gap: '30px', color: theme.textSecondary, fontSize: '13px' }}>
                            <span onClick={() => handleLikePost(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><HeartIcon /> {post.likes_count || 0}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}><CommentIcon /> {post.comments_count || 0}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {isOwner && (
                <div onClick={() => setShowComposer(true)} style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', cursor: 'pointer' }}>
                  <PlusIcon />
                </div>
              )}

              <div style={{ height: '40px' }} />
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '600px', background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'home' && location.pathname === '/dashboard'); return <button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>; })}
      </div>
    </div>
  );
};

export default Profile;