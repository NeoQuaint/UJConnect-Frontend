import { useState, useEffect, useRef } from 'react';
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

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const ConnectLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2"/>
    <circle cx="5" cy="19" r="2"/>
    <circle cx="19" cy="19" r="2"/>
    <path d="M6.5 17.5L10 7"/>
    <path d="M14 7l3.5 10.5"/>
    <line x1="7" y1="19" x2="17" y2="19"/>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
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

  const [viewingStoryUserId, setViewingStoryUserId] = useState(null);
  const [viewingStoryIndex, setViewingStoryIndex] = useState(0);
  const [viewingStoriesList, setViewingStoriesList] = useState([]);
  const [storyComments, setStoryComments] = useState([]);
  const [storyCommentText, setStoryCommentText] = useState('');
  const [storyLikes, setStoryLikes] = useState({});
  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const [viewedStories, setViewedStories] = useState(() => {
    const saved = localStorage.getItem('ujconnect_viewed_stories');
    return saved ? JSON.parse(saved) : [];
  });

  const [showMeetPeople, setShowMeetPeople] = useState(false);
  const [meetFilters, setMeetFilters] = useState({ scope: 'faculty', gender: 'mix', groupSize: 3 });
  const [matchedPeople, setMatchedPeople] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);

  const progressTimerRef = useRef(null);
  const videoRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');

  useEffect(() => {
    fetchPosts(); fetchUserProfile(); fetchStories();
    const onStorage = () => setDarkMode(localStorage.getItem('ujconnect_dark_mode') === 'true');
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('storage', onStorage); clearProgressTimer(); };
  }, []);

  useEffect(() => { localStorage.setItem('ujconnect_dark_mode', darkMode ? 'true' : 'false'); window.dispatchEvent(new Event('storage')); }, [darkMode]);
  useEffect(() => { localStorage.setItem('ujconnect_viewed_stories', JSON.stringify(viewedStories)); }, [viewedStories]);
  useEffect(() => { if (videoRef.current) { if (isStoryPaused) videoRef.current.pause(); else videoRef.current.play().catch(() => {}); } }, [isStoryPaused]);

  const clearProgressTimer = () => { if (progressTimerRef.current) { clearInterval(progressTimerRef.current); progressTimerRef.current = null; } };

  const fetchUserProfile = async () => { try { const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`); setUser(data); localStorage.setItem('ujconnect_user', JSON.stringify(data)); } catch (err) {} };
  const fetchPosts = async () => { try { const { data } = await axios.get(`${API_URL}/api/posts`); setPosts(data || []); } catch (err) {} finally { setLoading(false); } };
  const fetchStories = async () => { try { const { data } = await axios.get(`${API_URL}/api/stories`); setStoriesList(data || []); } catch (err) {} };
  const fetchComments = async (postId) => { try { const { data } = await axios.get(`${API_URL}/api/comments/${postId}`); setComments(data); } catch (err) {} };
  const fetchStoryComments = async (storyId) => { try { const { data } = await axios.get(`${API_URL}/api/comments/${storyId}`); setStoryComments(data || []); } catch (err) {} };

  const handlePostMediaUpload = async (file) => { if (!file) return; const fd = new FormData(); fd.append('file', file); try { const { data } = await axios.post(`${API_URL}/api/upload`, fd); setPostMedia(prev => [...prev, data.url]); } catch (err) {} };
  const handleCreatePost = async () => { if (!postContent.trim() && postMedia.length === 0) return; setPosting(true); try { const { data } = await axios.post(`${API_URL}/api/posts`, { user_id: user.id, content: postContent, media_url: postMedia[0] || null, media_type: postMedia.length > 0 ? 'image' : null, post_type: postTag || 'post' }); setPosts(prev => [data, ...prev]); setPostContent(''); setPostMedia([]); setPostTag(null); setShowComposer(false); } catch (err) {} finally { setPosting(false); } };
  const handleLikePost = async (postId) => { try { const { data } = await axios.post(`${API_URL}/api/posts/${postId}/like`, { user_id: user.id }); setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: data.liked ? p.likes_count + 1 : p.likes_count - 1 } : p)); setLikedPosts(prev => ({ ...prev, [postId]: data.liked })); } catch (err) {} };
  const handleAddComment = async (postId) => { if (!commentText.trim()) return; try { await axios.post(`${API_URL}/api/comments/${postId}`, { user_id: user.id, content: commentText }); setCommentText(''); fetchComments(postId); setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p)); } catch (err) {} };
  const handleDeleteComment = async (commentId, postId) => { try { await axios.delete(`${API_URL}/api/comments/${commentId}`); fetchComments(postId); setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments_count: Math.max((p.comments_count || 1) - 1, 0) } : p)); } catch (err) {} };
  const toggleComments = (postId) => { if (expandedPost === postId) { setExpandedPost(null); setComments([]); } else { setExpandedPost(postId); fetchComments(postId); setCommentText(''); } };

  const handleStoryFileSelect = (e) => { const file = e.target.files[0]; if (!file) return; if (file.type.startsWith('video')) { const video = document.createElement('video'); video.preload = 'metadata'; video.onloadedmetadata = () => { if (video.duration > 30) { alert('Video must be 30 seconds or less'); return; } setStoryFile(file); const r = new FileReader(); r.onload = () => setStoryPreview(r.result); r.readAsDataURL(file); setShowStoryUpload(true); }; video.src = URL.createObjectURL(file); } else { setStoryFile(file); const r = new FileReader(); r.onload = () => setStoryPreview(r.result); r.readAsDataURL(file); setShowStoryUpload(true); } };
  const handleUploadStory = async () => { if (!storyFile) return; setUploadingStory(true); const fd = new FormData(); fd.append('file', storyFile); try { const ur = await axios.post(`${API_URL}/api/upload`, fd); await axios.post(`${API_URL}/api/stories`, { user_id: user.id, media_url: ur.data.url, media_type: storyFile.type.startsWith('video') ? 'video' : 'image' }); setStoryFile(null); setStoryPreview(null); setShowStoryUpload(false); fetchStories(); } catch (err) {} finally { setUploadingStory(false); } };
  const handleDeleteStory = async (storyId) => { try { await axios.delete(`${API_URL}/api/stories/${storyId}`); if (viewingStoriesList.length <= 1) setViewingStoryUserId(null); else goToNextStory(); fetchStories(); } catch (err) {} };

  const startStoryProgress = (story) => { clearProgressTimer(); const duration = story && story.media_type === 'video' ? 15000 : 6000; const interval = 50; const steps = duration / interval; let step = 0; setStoryProgress(0); progressTimerRef.current = setInterval(() => { if (!isStoryPaused) { step++; setStoryProgress(Math.min((step / steps) * 100, 100)); if (step >= steps) { clearProgressTimer(); goToNextStory(); } } }, interval); };
  const goToNextStory = () => { clearProgressTimer(); if (!viewingStoriesList || viewingStoriesList.length === 0) { setViewingStoryUserId(null); return; } const ni = viewingStoryIndex + 1; if (ni < viewingStoriesList.length) { setViewingStoryIndex(ni); const ns = viewingStoriesList[ni]; fetchStoryComments(ns.id); if (!ns.isMine && !viewedStories.includes(ns.id)) setViewedStories(prev => [...prev, ns.id]); setStoryProgress(0); setIsStoryPaused(false); setTimeout(() => startStoryProgress(ns), 100); return; } const au = Object.keys(storiesByUser); const ci = au.indexOf(String(viewingStoryUserId)); for (let i = ci + 1; i < au.length; i++) { const uid = au[i]; const us = storiesByUser[uid]; if (us && us.length > 0) { setViewingStoryUserId(parseInt(uid)); setViewingStoriesList(us); setViewingStoryIndex(0); const fs = us[0]; fetchStoryComments(fs.id); if (!fs.isMine && !viewedStories.includes(fs.id)) setViewedStories(prev => [...prev, fs.id]); setStoryProgress(0); setIsStoryPaused(false); setTimeout(() => startStoryProgress(fs), 100); return; } } setViewingStoryUserId(null); setViewingStoriesList([]); };
  const handleViewStory = (userId) => { clearProgressTimer(); const us = storiesByUser[userId] || []; if (us.length === 0) return; setViewingStoryUserId(userId); setViewingStoriesList(us); setViewingStoryIndex(0); setIsStoryPaused(false); const fs = us[0]; fetchStoryComments(fs.id); if (!fs.isMine && !viewedStories.includes(fs.id)) setViewedStories(prev => [...prev, fs.id]); setStoryProgress(0); setTimeout(() => startStoryProgress(fs), 100); };
  const toggleStoryPause = () => setIsStoryPaused(prev => !prev);
  const handleStoryComment = async (storyId) => { if (!storyCommentText.trim()) return; try { await axios.post(`${API_URL}/api/comments/${storyId}`, { user_id: user.id, content: storyCommentText }); setStoryCommentText(''); fetchStoryComments(storyId); } catch (err) {} };
  const handleStoryLike = async (storyId) => { try { const { data } = await axios.post(`${API_URL}/api/posts/${storyId}/like`, { user_id: user.id }); setStoryLikes(prev => ({ ...prev, [storyId]: data.liked })); } catch (err) {} };

  const handleFindPeople = async () => { setLoadingPeople(true); try { const { data } = await axios.get(`${API_URL}/api/users/match`, { params: { scope: meetFilters.scope, gender: meetFilters.gender, limit: meetFilters.groupSize, exclude: [user.id, ...addedUsers.map(u => u.id)] } }); setMatchedPeople(data || []); } catch (err) { setMatchedPeople([{ id: 10, preferred_name: 'Thabo', full_name: 'Thabo Molefe', department: 'Applied Information Systems', profile_pic: null, year: '2nd' },{ id: 11, preferred_name: 'Lerato', full_name: 'Lerato Khumalo', department: 'Marketing', profile_pic: null, year: '3rd' },{ id: 12, preferred_name: 'Sipho', full_name: 'Sipho Nkosi', department: 'Finance & Investment Management', profile_pic: null, year: '1st' }].slice(0, meetFilters.groupSize)); } finally { setLoadingPeople(false); } };
  const handleAddPerson = (person) => { setAddedUsers(prev => [...prev, person]); setMatchedPeople(prev => prev.filter(p => p.id !== person.id)); };

  const formatTime = (ds) => { const n = new Date(), d = new Date(ds), dm = Math.floor((n-d)/60000), dh = Math.floor(dm/60), dd = Math.floor(dh/24); if (dm<1) return 'Just now'; if (dm<60) return `${dm}m`; if (dh<24) return `${dh}h`; if (dd===1) return 'Yesterday'; if (dd<7) return `${dd}d`; return d.toLocaleDateString('en-ZA',{day:'numeric',month:'short'}); };
  const renderContent = (t) => { if(!t) return null; return t.split(/(#\w+)/g).map((p,i)=>p.startsWith('#')?<span key={i} style={{color:'#4da6ff',fontWeight:500}}>{p}</span>:p); };
  const getFacultyColor = (dept) => { const c=['Applied Information Systems','Business Management','Economics and Econometrics','Finance & Investment Management','Information & Knowledge Management','Public Management & Governance','Hospitality','Commercial Accountancy','Industrial Psychology','Marketing','Transport & Supply Chain Management','Tourism','Accountancy']; if(c.some(d=>dept?.includes(d)))return'#2563eb'; if(dept?.includes('Law'))return'#dc2626'; if(dept?.includes('Science'))return'#16a34a'; if(dept?.includes('Humanities'))return'#9333ea'; if(dept?.includes('Health'))return'#ea580c'; if(dept?.includes('Engineering'))return'#ca8a04'; return'#666'; };
  const getFacultyGradient = (dept) => `linear-gradient(135deg,${getFacultyColor(dept)},${getFacultyColor(dept)}88)`;

  const theme = { bg:darkMode?'#000':'#fff', text:darkMode?'#fff':'#1a1a1a', textSecondary:darkMode?'#aaa':'#888', border:darkMode?'#222':'#eee', borderLight:darkMode?'#1a1a1a':'#f5f5f5', cardBg:darkMode?'#111':'#f5f5f5', inputBg:darkMode?'#1a1a1a':'#f5f5f5' };

  const hubTabs = [
    { id: 'connect', title: '', subtitle: '', color: '#FF6B00', bg: '#FFF7ED', icon: ConnectLogo, link: '/connect-hub', isLogo: true },
    { id: 'running', title: 'Running Club', subtitle: 'Join the pack', color: '#16a34a', bg: '#f0fdf4', link: '/running-club' },
    { id: 'varsity', title: 'Varsity Cup', subtitle: 'Game day', color: '#dc2626', bg: '#fef2f2', link: '/varsity-cup' },
    { id: 'tours', title: 'Campus Tours', subtitle: 'Explore UJ', color: '#9333ea', bg: '#faf5ff', link: '/campus-tours' },
    { id: 'career', title: 'Career Fair', subtitle: 'Get hired', color: '#ea580c', bg: '#fff7ed', link: '/career-fair' },
    { id: 'gaming', title: 'Gaming Zone', subtitle: 'Play now', color: '#ca8a04', bg: '#fefce8', link: '/gaming' },
  ];

  const defaultStories = [{id:'d1',name:'Thabo',dept:'Applied Information Systems'},{id:'d2',name:'Lerato',dept:'Marketing'},{id:'d3',name:'Sipho',dept:'Finance & Investment Management'},{id:'d4',name:'Amahle',dept:'Information & Knowledge Management'},{id:'d5',name:'Neo',dept:'Law'}];
  const tabs = [{id:'home',icon:HomeIcon,label:'Feed'},{id:'projects',icon:ProjectsIcon,label:'Collabs'},{id:'communities',icon:CommunitiesIcon,label:'Squads'},{id:'forums',icon:ForumsIcon,label:'The Plug'},{id:'messages',icon:MessagesIcon,label:'Chats'}];

  const myStories = storiesList.filter(s=>s.user_id===user.id);
  const otherStories = storiesList.filter(s=>s.user_id!==user.id);
  const storiesByUser = {};
  if(myStories.length>0) storiesByUser[user.id] = myStories.map(s=>({...s,isMine:true}));
  otherStories.forEach(s=>{if(!storiesByUser[s.user_id])storiesByUser[s.user_id]=[];storiesByUser[s.user_id].push({...s,isMine:false});});
  const currentViewingStory = viewingStoryUserId && viewingStoriesList.length>0 ? viewingStoriesList[viewingStoryIndex] : null;

  const handleTabClick = (tabId) => { if (tabId === 'home') return; if (tabId === 'projects') navigate('/projects'); else if (tabId === 'communities') navigate('/communities'); else if (tabId === 'forums') navigate('/forums'); else if (tabId === 'messages') navigate('/messages'); };

  const scopeOptions = [{ value: 'faculty', label: 'My Faculty' },{ value: 'campus', label: 'My Campus' },{ value: 'university', label: 'All UJ' },{ value: 'different', label: 'Different Campus' }];
  const genderOptions = [{ value: 'mix', label: 'Mixed' },{ value: 'male', label: 'Males Only' },{ value: 'female', label: 'Females Only' }];

  const renderHome = () => (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => navigate('/profile')} style={{ width: 34, height: 34, borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', flexShrink: 0 }}>
          {!user.profile_pic && (user.full_name?.charAt(0) || user.email?.charAt(0) || 'U')}
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={() => setShowMeetPeople(true)}>
          <img src="/UJCONNECT.png" alt="UJ Connect" style={{ height: 40, width: 'auto' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: `1.5px solid ${theme.border}`, padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, color: theme.text, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626', display: 'inline-block' }} /> Live
          </button>
          <button onClick={() => setShowComposer(true)} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '8px 18px', borderRadius: 20, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Post</button>
        </div>
      </div>

      {/* Hub Tabs Banner - Rectangular Facebook-style */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {hubTabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => navigate(tab.link)}
              style={{
                flexShrink: 0,
                width: tab.isLogo ? 110 : 130,
                height: 180,
                borderRadius: 12,
                background: tab.isLogo
                  ? `linear-gradient(135deg, ${tab.color}, ${tab.color}dd)`
                  : darkMode ? '#111' : tab.bg,
                border: tab.isLogo ? 'none' : `1px solid ${darkMode ? '#222' : tab.color}20`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: tab.isLogo ? 'center' : 'flex-start',
                padding: tab.isLogo ? 0 : 12,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {tab.isLogo ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ color: 'white', transform: 'scale(2)' }}>
                    <ConnectLogo />
                  </div>
                </div>
              ) : (
                <>
                  <div style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${tab.color}22, ${tab.color}44)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10
                  }}>
                    <div style={{ fontSize: 32, opacity: 0.6 }}>{tab.title.charAt(0)}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: tab.color, marginBottom: 2 }}>{tab.title}</div>
                  <div style={{ fontSize: 10, color: theme.textSecondary, textAlign: 'center' }}>{tab.subtitle}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Search + What's happening */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: theme.inputBg, borderRadius: 24, padding: '10px 16px', marginBottom: 12 }}>
          <SearchIcon />
          <input type="text" placeholder="Search" style={{ width: 55, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, fontFamily: 'inherit', color: theme.text }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
            {!user.profile_pic && (user.full_name?.charAt(0) || user.email?.charAt(0) || 'U')}
          </div>
          <input type="text" placeholder="What's happening?" onFocus={() => setShowComposer(true)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit', color: theme.text, background: 'transparent', cursor: 'pointer' }} readOnly />
        </div>
      </div>

      {/* Stories Row */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: 14, overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <div onClick={() => document.getElementById('story-file-input').click()} style={{ cursor: 'pointer', color: '#FF6B00', display: 'flex', justifyContent: 'center', marginBottom: 2 }}><SmallPlusIcon /></div>
          <div onClick={() => { if (myStories.length > 0) handleViewStory(user.id); else document.getElementById('story-file-input').click(); }} style={{ width: 60, height: 60, borderRadius: '50%', padding: 3, background: myStories.length > 0 ? getFacultyGradient(user.department) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : theme.cardBg, border: myStories.length === 0 ? `2px solid ${theme.border}` : 'none' }}>
              {!user.profile_pic && <span style={{ fontWeight: 700, fontSize: 18, color: theme.textSecondary }}>{user.full_name?.charAt(0) || 'U'}</span>}
            </div>
          </div>
          <span style={{ fontSize: 11, color: theme.textSecondary, fontWeight: 500 }}>You</span>
        </div>
        <input id="story-file-input" type="file" accept="image/*,video/*" onChange={handleStoryFileSelect} style={{ display: 'none' }} />
        {Object.keys(storiesByUser).filter(uid => parseInt(uid) !== user.id).map(uid => { const uss = storiesByUser[uid]; const fs = uss[0]; const av = uss.every(s => viewedStories.includes(s.id)); return (<div key={uid} onClick={() => handleViewStory(parseInt(uid))} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', flexShrink: 0 }}><div style={{ width: 60, height: 60, borderRadius: '50%', padding: 3, background: av ? '#888' : getFacultyGradient(fs.department), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.cardBg }}>{fs.profile_pic ? <img src={fs.profile_pic} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontWeight: 700, fontSize: 18, color: theme.textSecondary }}>{(fs.preferred_name || fs.full_name || '?').charAt(0)}</span>}</div></div><span style={{ fontSize: 11, color: theme.textSecondary, fontWeight: 500 }}>{fs.preferred_name || fs.full_name || 'User'}</span></div>); })}
        {Object.keys(storiesByUser).filter(uid => parseInt(uid) !== user.id).length === 0 && defaultStories.map(s => (<div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', flexShrink: 0 }}><div style={{ width: 60, height: 60, borderRadius: '50%', padding: 3, background: getFacultyGradient(s.dept), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 54, height: 54, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg,${getFacultyColor(s.dept)},${getFacultyColor(s.dept)}88)` }}><span style={{ fontWeight: 700, fontSize: 18, color: 'white' }}>{s.name.charAt(0)}</span></div></div><span style={{ fontSize: 11, color: theme.textSecondary, fontWeight: 500 }}>{s.name}</span></div>))}
      </div>

      {/* Feed */}
      <div>
        {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><div style={{ width: 30, height: 30, border: `3px solid ${theme.border}`, borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div> : posts.length === 0 ? <div style={{ padding: 40, textAlign: 'center', color: theme.textSecondary, fontSize: 15 }}>No posts yet. Drop something!</div> : posts.map(post => (
          <div key={post.id} style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.borderLight}` }}>
            <div style={{ display: 'flex', gap: 12, cursor: 'pointer' }} onClick={() => navigate(`/profile/${post.user_id}`)}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: post.profile_pic ? `url(${post.profile_pic}) center/cover` : theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: post.profile_pic ? 'transparent' : theme.textSecondary, fontWeight: 600, fontSize: 15, flexShrink: 0, position: 'relative' }}>{!post.profile_pic && (post.preferred_name || post.full_name || '?').charAt(0)}{post.department && <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: getFacultyColor(post.department), border: `2px solid ${theme.bg}` }} />}</div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}><span style={{ fontWeight: 700, fontSize: 15, color: theme.text }}>{post.preferred_name || post.full_name || 'Student'}</span><span style={{ color: theme.textSecondary, fontSize: 14 }}>· {formatTime(post.created_at)}</span></div><p style={{ margin: '0 0 12px', fontSize: 15, lineHeight: 1.5, color: theme.text, whiteSpace: 'pre-wrap' }}>{renderContent(post.content)}{post.post_type === 'warning' && <WarningIcon color="#dc2626" />}{post.post_type === 'awareness' && <AwarenessIcon color="#f59e0b" />}</p>{post.media_url && (post.media_type === 'video' ? <video src={post.media_url} controls style={{ width: '100%', maxHeight: 300, borderRadius: 12, marginBottom: 10 }} /> : <img src={post.media_url} alt="Post media" style={{ width: '100%', maxHeight: 300, borderRadius: 12, objectFit: 'cover', marginBottom: 10 }} />)}</div>
            </div>
            <div style={{ display: 'flex', gap: 40, color: theme.textSecondary, marginTop: 4 }}>
              <span onClick={(e) => { e.stopPropagation(); toggleComments(post.id); }} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: expandedPost === post.id ? '#FF6B00' : theme.textSecondary }}><CommentIcon /> {post.comments_count || 0}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><RepostIcon /> {post.reposts_count || 0}</span>
              <span onClick={(e) => { e.stopPropagation(); handleLikePost(post.id); }} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: likedPosts[post.id] ? '#dc2626' : theme.textSecondary }}><HeartIcon filled={likedPosts[post.id]} /> {post.likes_count || 0}</span>
            </div>
            {expandedPost === post.id && (
              <div style={{ marginTop: 12, borderTop: `1px solid ${theme.border}`, paddingTop: 12 }}>
                {comments.length === 0 && <div style={{ color: theme.textSecondary, fontSize: 13, textAlign: 'center', padding: 10 }}>No comments yet</div>}
                {comments.map(c => (<div key={c.id} style={{ display: 'flex', gap: 8, marginBottom: 10 }}><div style={{ width: 28, height: 28, borderRadius: '50%', background: c.profile_pic ? `url(${c.profile_pic}) center/cover` : theme.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary, fontWeight: 600, fontSize: 12, flexShrink: 0 }}>{!c.profile_pic && (c.preferred_name || c.full_name || '?').charAt(0)}</div><div style={{ background: theme.inputBg, borderRadius: 12, padding: '8px 12px', flex: 1, position: 'relative' }}><span style={{ fontWeight: 600, fontSize: 12, color: theme.text }}>{c.preferred_name || c.full_name || 'Student'}</span><p style={{ margin: '2px 0 0', fontSize: 14, color: theme.text }}>{c.content}</p>{c.user_id === user.id && <button onClick={() => handleDeleteComment(c.id, post.id)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', padding: 2, opacity: 0.5 }}><TrashIcon /></button>}</div></div>))}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><div style={{ width: 28, height: 28, borderRadius: '50%', background: user.profile_pic ? `url(${user.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>{!user.profile_pic && (user.full_name?.charAt(0) || 'U')}</div><div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: theme.inputBg, borderRadius: 20, padding: '6px 12px' }}><input type="text" placeholder="Write a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleAddComment(post.id); }} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'transparent', color: theme.text, fontFamily: 'inherit' }} />{commentText.trim() && <button onClick={() => handleAddComment(post.id)} style={{ background: 'none', border: 'none', color: '#FF6B00', cursor: 'pointer', padding: 4, display: 'flex' }}><SendIcon /></button>}</div></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative' }}>
      {renderHome()}

      {/* STORY UPLOAD PREVIEW */}
      {showStoryUpload && storyPreview && (<div onClick={() => { setShowStoryUpload(false); setStoryFile(null); setStoryPreview(null); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}><button onClick={() => { setShowStoryUpload(false); setStoryFile(null); setStoryPreview(null); }} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 5 }}><CloseIcon /></button><div style={{ color: 'white', fontSize: 16, marginBottom: 20, fontWeight: 600 }}>Preview Story</div>{storyFile?.type?.startsWith('video') ? <video src={storyPreview} controls style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: 12 }} /> : <img src={storyPreview} alt="Story" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: 12, objectFit: 'contain' }} />}<div style={{ display: 'flex', gap: 12, marginTop: 20 }}><button onClick={() => { setShowStoryUpload(false); setStoryFile(null); setStoryPreview(null); }} style={{ padding: '14px 30px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button><button onClick={handleUploadStory} disabled={uploadingStory} style={{ padding: '14px 30px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: uploadingStory ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: uploadingStory ? 0.7 : 1 }}>{uploadingStory ? 'Uploading...' : 'Post Story'}</button></div></div>)}

      {/* STORY VIEWER */}
      {currentViewingStory && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 4, padding: '12px 16px', paddingTop: 'max(12px, env(safe-area-inset-top))' }}>{viewingStoriesList.map((_, i) => (<div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}><div style={{ height: '100%', background: 'white', width: i < viewingStoryIndex ? '100%' : i === viewingStoryIndex ? `${storyProgress}%` : '0%', transition: 'width 0.1s linear' }} /></div>))}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: '50%', background: currentViewingStory.profile_pic ? `url(${currentViewingStory.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'white' }}>{!currentViewingStory.profile_pic && (currentViewingStory.preferred_name || currentViewingStory.full_name || '?').charAt(0)}</div><span style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>{currentViewingStory.isMine ? 'You' : (currentViewingStory.preferred_name || currentViewingStory.full_name || 'User')}</span><span style={{ fontSize: 12, color: '#aaa' }}>{formatTime(currentViewingStory.created_at)}</span></div><div style={{ display: 'flex', gap: 12 }}>{currentViewingStory.isMine && <button onClick={() => handleDeleteStory(currentViewingStory.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><TrashIcon /></button>}<button onClick={() => { clearProgressTimer(); setViewingStoryUserId(null); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><CloseIcon /></button></div></div>
        <div onClick={toggleStoryPause} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>{currentViewingStory.media_type === 'video' ? <video ref={videoRef} src={currentViewingStory.media_url} autoPlay playsInline style={{ width: '100%', maxHeight: '62vh', objectFit: 'contain', borderRadius: 12 }} onEnded={goToNextStory} /> : <img src={currentViewingStory.media_url} alt="Story" style={{ width: '100%', maxHeight: '62vh', objectFit: 'contain', borderRadius: 12 }} />}</div>
        <div style={{ padding: '16px 20px', paddingBottom: 'max(16px, env(safe-area-inset-bottom))', background: 'rgba(0,0,0,0.8)' }}>
          {storyComments.length > 0 && (<div style={{ maxHeight: 100, overflowY: 'auto', marginBottom: 10 }}>{storyComments.map(c => (<div key={c.id} style={{ display: 'flex', gap: 8, marginBottom: 6 }}><div style={{ width: 22, height: 22, borderRadius: '50%', background: c.profile_pic ? `url(${c.profile_pic}) center/cover` : '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 10, color: 'white', flexShrink: 0 }}>{!c.profile_pic && (c.preferred_name || c.full_name || '?').charAt(0)}</div><div style={{ background: '#333', borderRadius: 10, padding: '5px 10px' }}><span style={{ fontWeight: 600, fontSize: 11, color: '#ccc' }}>{c.preferred_name || c.full_name || 'Student'}</span><p style={{ margin: '1px 0 0', fontSize: 13, color: 'white' }}>{c.content}</p></div></div>))}</div>)}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span onClick={() => handleStoryLike(currentViewingStory.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: storyLikes[currentViewingStory.id] ? '#dc2626' : 'white', fontSize: 13 }}><HeartIcon filled={storyLikes[currentViewingStory.id]} /></span><span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#aaa', fontSize: 13 }}><CommentIcon /> {storyComments.length}</span><input type="text" placeholder="Add a comment..." value={storyCommentText} onChange={e => setStoryCommentText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleStoryComment(currentViewingStory.id); }} style={{ flex: 1, padding: '10px 14px', borderRadius: 20, border: 'none', outline: 'none', fontSize: 13, background: '#333', color: 'white', fontFamily: 'inherit' }} />{storyCommentText.trim() && <button onClick={() => handleStoryComment(currentViewingStory.id)} style={{ background: '#FF6B00', color: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><SendIcon /></button>}</div>
        </div>
      </div>)}

      {/* COMPOSER MODAL */}
      {showComposer && (<div onClick={() => { setShowComposer(false); setPostTag(null); setPostContent(''); setPostMedia([]); }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20, paddingTop: 60 }}><div onClick={e => e.stopPropagation()} style={{ background: theme.bg, borderRadius: 20, width: '100%', maxWidth: 500, overflow: 'hidden' }}><div style={{ display: 'flex', borderBottom: `1px solid ${theme.border}` }}>{['post', 'project', 'community'].map(t => (<button key={t} onClick={() => setComposerTab(t)} style={{ flex: 1, padding: 14, background: 'none', border: 'none', color: composerTab === t ? '#FF6B00' : theme.textSecondary, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}>{t.charAt(0).toUpperCase() + t.slice(1)}{composerTab === t && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2, background: '#FF6B00', borderRadius: 1 }} />}</button>))}<button onClick={() => { setShowComposer(false); setPostTag(null); setPostContent(''); setPostMedia([]); }} style={{ padding: 14, background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', fontSize: 18 }}><CloseIcon /></button></div>{composerTab === 'post' && (<div style={{ padding: 16 }}><div style={{ display: 'flex', gap: 10, marginBottom: 16 }}><button onClick={() => setPostTag(postTag === 'warning' ? null : 'warning')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, border: postTag === 'warning' ? '2px solid #dc2626' : `1.5px solid ${theme.border}`, background: postTag === 'warning' ? '#fef2f2' : 'transparent', color: postTag === 'warning' ? '#dc2626' : theme.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><WarningIcon color={postTag === 'warning' ? '#dc2626' : theme.textSecondary} /> Warning</button><button onClick={() => setPostTag(postTag === 'awareness' ? null : 'awareness')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, border: postTag === 'awareness' ? '2px solid #f59e0b' : `1.5px solid ${theme.border}`, background: postTag === 'awareness' ? '#fffbeb' : 'transparent', color: postTag === 'awareness' ? '#f59e0b' : theme.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}><AwarenessIcon color={postTag === 'awareness' ? '#f59e0b' : theme.textSecondary} /> Awareness</button></div><textarea value={postContent} onChange={e => setPostContent(e.target.value)} placeholder="What's happening?" rows={5} style={{ width: '100%', padding: '12px 0', border: 'none', outline: 'none', fontSize: 16, fontFamily: 'inherit', resize: 'none', background: 'transparent', color: theme.text, boxSizing: 'border-box' }} />{postMedia.length > 0 && (<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>{postMedia.map((url, i) => (<div key={i} style={{ position: 'relative' }}><img src={url} alt="Media" style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover' }} /><button onClick={() => setPostMedia(prev => prev.filter((_, j) => j !== i))} style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: '#dc2626', color: 'white', border: 'none', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>x</button></div>))}</div>)}<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: 12 }}><div style={{ display: 'flex', gap: 8 }}><label style={{ cursor: 'pointer', color: theme.textSecondary, padding: 6, display: 'flex' }}><ImageIcon /><input type="file" accept="image/*" onChange={e => handlePostMediaUpload(e.target.files[0])} style={{ display: 'none' }} /></label><label style={{ cursor: 'pointer', color: theme.textSecondary, padding: 6, display: 'flex' }}><VideoIcon /><input type="file" accept="video/*" onChange={e => handlePostMediaUpload(e.target.files[0])} style={{ display: 'none' }} /></label></div><button onClick={handleCreatePost} disabled={posting || (!postContent.trim() && postMedia.length === 0)} style={{ padding: '10px 24px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: 24, fontSize: 14, fontWeight: 600, cursor: posting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: posting || (!postContent.trim() && postMedia.length === 0) ? 0.5 : 1 }}>{posting ? 'Posting...' : 'Post'}</button></div></div>)}{composerTab === 'project' && (<div style={{ padding: 24, textAlign: 'center' }}><h3 style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16 }}>Start a Collab</h3><button onClick={() => { setShowComposer(false); navigate('/projects'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 28px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 16 }}><SmallPlusIcon /> Start a Collab</button></div>)}{composerTab === 'community' && (<div style={{ padding: 24, textAlign: 'center' }}><h3 style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16 }}>Start a Squad</h3><button onClick={() => { setShowComposer(false); navigate('/communities'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 28px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 16 }}><SmallPlusIcon /> Start a Squad</button></div>)}</div></div>)}

      {/* MEET PEOPLE MODAL */}
      {showMeetPeople && (
        <div onClick={() => setShowMeetPeople(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.bg, borderRadius: 20, width: '100%', maxWidth: 450, maxHeight: '90vh', overflowY: 'auto', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PlusCircleIcon /><h3 style={{ fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>Meet New People</h3></div>
              <button onClick={() => setShowMeetPeople(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary }}><CloseIcon /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: 6 }}>Where from?</label><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{scopeOptions.map(opt => (<button key={opt.value} onClick={() => setMeetFilters(prev => ({ ...prev, scope: opt.value }))} style={{ padding: '6px 12px', borderRadius: 20, border: meetFilters.scope === opt.value ? 'none' : `1.5px solid ${theme.border}`, background: meetFilters.scope === opt.value ? '#FF6B00' : 'transparent', color: meetFilters.scope === opt.value ? 'white' : theme.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{opt.label}</button>))}</div></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: 6 }}>Who?</label><div style={{ display: 'flex', gap: 6 }}>{genderOptions.map(opt => (<button key={opt.value} onClick={() => setMeetFilters(prev => ({ ...prev, gender: opt.value }))} style={{ padding: '6px 12px', borderRadius: 20, border: meetFilters.gender === opt.value ? 'none' : `1.5px solid ${theme.border}`, background: meetFilters.gender === opt.value ? '#FF6B00' : 'transparent', color: meetFilters.gender === opt.value ? 'white' : theme.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{opt.label}</button>))}</div></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: 6 }}>How many? ({meetFilters.groupSize})</label><input type="range" min="1" max="6" value={meetFilters.groupSize} onChange={e => setMeetFilters(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#FF6B00' }} /></div>
              <button onClick={handleFindPeople} disabled={loadingPeople} style={{ width: '100%', padding: 14, background: '#FF6B00', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: loadingPeople ? 0.7 : 1 }}>{loadingPeople ? 'Finding people...' : 'Find People'}</button>
            </div>
            {matchedPeople.length > 0 && (
              <div style={{ position: 'relative', width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: `1px dashed ${theme.border}`, animation: 'spin 30s linear infinite' }} />
                <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', border: `1px dashed ${theme.border}`, animation: 'spin 20s linear infinite reverse' }} />
                <div style={{ zIndex: 2, textAlign: 'center', background: theme.bg, padding: 16, borderRadius: '50%', width: 90, height: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Meet</div><div style={{ fontSize: 11, color: theme.textSecondary }}>Tap +</div></div>
                {matchedPeople.map((person, i) => { const total = matchedPeople.length; const angle = (i / total) * 2 * Math.PI - Math.PI / 2; const radius = 110; const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius; return (<div key={person.id} onClick={() => handleAddPerson(person)} style={{ position: 'absolute', transform: `translate(${x}px, ${y}px)`, cursor: 'pointer', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><div style={{ width: 52, height: 52, borderRadius: '50%', background: person.profile_pic ? `url(${person.profile_pic}) center/cover` : getFacultyColor(person.department), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, border: `3px solid ${theme.bg}`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', animation: 'float 3s ease-in-out infinite', animationDelay: `${i * 0.5}s`, position: 'relative' }}>{!person.profile_pic && (person.preferred_name || person.full_name || '?').charAt(0)}<div style={{ position: 'absolute', bottom: -3, right: -3, width: 20, height: 20, borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${theme.bg}` }}><span style={{ color: 'white', fontSize: 12, lineHeight: 1, fontWeight: 700 }}>+</span></div></div><span style={{ fontSize: 10, color: theme.textSecondary, fontWeight: 500, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }}>{person.preferred_name || person.full_name}</span></div>); })}
              </div>
            )}
            {addedUsers.length > 0 && (
              <div style={{ marginTop: 20, borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 10 }}>Added ({addedUsers.length})</div>
                {addedUsers.map(person => (<div key={person.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}><div style={{ width: 36, height: 36, borderRadius: '50%', background: getFacultyColor(person.department), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 14 }}>{(person.preferred_name || person.full_name || '?').charAt(0)}</div><span style={{ fontSize: 14, color: theme.text, flex: 1 }}>{person.preferred_name || person.full_name}</span><button onClick={() => navigate('/messages')} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Chat</button></div>))}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'home'); return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>); })}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  );
};

export default Dashboard;