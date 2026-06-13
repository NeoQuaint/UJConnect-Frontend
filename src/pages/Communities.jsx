import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const CommunitiesTabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SmallPlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const ConnectPeopleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2"/>
    <circle cx="5" cy="19" r="2"/>
    <circle cx="19" cy="19" r="2"/>
    <path d="M6.5 17.5L10 7"/>
    <path d="M14 7l3.5 10.5"/>
    <line x1="7" y1="19" x2="17" y2="19"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Communities = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [darkMode, setDarkMode] = useState(true);

  const [activeSection, setActiveSection] = useState('projects');

  const [projects, setProjects] = useState([]);
  const [projectFilter, setProjectFilter] = useState('All');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', tags: '', link: '' });
  const [creatingProject, setCreatingProject] = useState(false);

  const [forums, setForums] = useState([]);
  const [forumFilter, setForumFilter] = useState('All');

  const [meetFilters, setMeetFilters] = useState({ scope: 'faculty', gender: 'mix', groupSize: 3 });
  const [matchedPeople, setMatchedPeople] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchProjects();
    fetchForums();
    const onStorage = () => {
      const saved = localStorage.getItem('ujconnect_dark_mode');
      if (saved !== null) setDarkMode(saved === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`);
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
      // Load dark mode from DB
      const dbDarkMode = data.dark_mode;
      if (dbDarkMode !== null && dbDarkMode !== undefined) {
        const isDark = dbDarkMode === 'true' || dbDarkMode === true;
        setDarkMode(isDark);
        localStorage.setItem('ujconnect_dark_mode', isDark ? 'true' : 'false');
      }
    } catch (err) {
      // Fallback to localStorage
      const saved = localStorage.getItem('ujconnect_dark_mode');
      setDarkMode(saved !== null ? saved === 'true' : true);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/projects`);
      setProjects(data || []);
    } catch (err) {
      setProjects([
        { id: 1, name: 'Campus Event App', description: 'Building a mobile app for campus events and activities', tags: ['Tech', 'Mobile'], link: '', preferred_name: 'Thabo', profile_pic: null },
        { id: 2, name: 'Study Group Finder', description: 'Platform to connect students for study groups based on courses', tags: ['Tech', 'Web'], link: '', preferred_name: 'Lerato', profile_pic: null },
        { id: 3, name: 'UJ Merch Design', description: 'Designing new merchandise for the university community', tags: ['Design', 'Business'], link: '', preferred_name: 'Sipho', profile_pic: null },
      ]);
    }
  };

  const fetchForums = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/forums`);
      setForums(data || []);
    } catch (err) {
      setForums([
        { id: 1, title: 'Best study spots on campus?', content: 'Looking for quiet places to study during exams', author: 'Amahle', replies: 12, tags: ['Academics'], time: '2h ago' },
        { id: 2, title: 'Tips for first year students', content: 'Share your best advice for newcomers', author: 'Neo', replies: 28, tags: ['Advice'], time: '5h ago' },
        { id: 3, title: 'Parking situation this semester', content: 'Has anyone else noticed the parking is worse?', author: 'Karabo', replies: 15, tags: ['Campus Life'], time: '1d ago' },
        { id: 4, title: 'Textbook exchange thread', content: 'Buy/sell/trade textbooks here', author: 'Tshepo', replies: 34, tags: ['Resources'], time: '2d ago' },
      ]);
    }
  };

  const handleCreateProject = async () => {
    if (!projectForm.name.trim()) return;
    setCreatingProject(true);
    try {
      const tagsArray = projectForm.tags.split(',').map(t => t.trim()).filter(t => t);
      const { data } = await axios.post(`${API_URL}/api/projects`, {
        user_id: user.id,
        name: projectForm.name.trim(),
        description: projectForm.description.trim(),
        tags: tagsArray,
        link: projectForm.link.trim()
      });
      setProjects(prev => [data, ...prev]);
      setProjectForm({ name: '', description: '', tags: '', link: '' });
      setShowProjectModal(false);
    } catch (err) {} finally { setCreatingProject(false); }
  };

  const handleFindPeople = async () => {
    setLoadingPeople(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/users/match`, {
        params: { scope: meetFilters.scope, gender: meetFilters.gender, limit: meetFilters.groupSize, exclude: [user.id, ...addedUsers.map(u => u.id)] }
      });
      setMatchedPeople(data || []);
    } catch (err) {
      setMatchedPeople([
        { id: 10, preferred_name: 'Thabo', full_name: 'Thabo Molefe', department: 'Applied Information Systems', profile_pic: null, year: '2nd' },
        { id: 11, preferred_name: 'Lerato', full_name: 'Lerato Khumalo', department: 'Marketing', profile_pic: null, year: '3rd' },
        { id: 12, preferred_name: 'Sipho', full_name: 'Sipho Nkosi', department: 'Finance & Investment Management', profile_pic: null, year: '1st' },
      ].slice(0, meetFilters.groupSize));
    } finally { setLoadingPeople(false); }
  };

  const handleAddPerson = (person) => {
    setAddedUsers(prev => [...prev, person]);
    setMatchedPeople(prev => prev.filter(p => p.id !== person.id));
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f9fafb',
    inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
  };

  const projectFilters = ['All', 'Tech', 'Design', 'Business', 'Science', 'Law'];
  const filteredProjects = projectFilter === 'All'
    ? projects
    : projects.filter(p => p.tags?.some(t => t.toLowerCase() === projectFilter.toLowerCase()));

  const forumFilters = ['All', 'Academics', 'Campus Life', 'Advice', 'Resources', 'Events'];
  const filteredForums = forumFilter === 'All'
    ? forums
    : forums.filter(f => f.tags?.some(t => t.toLowerCase() === forumFilter.toLowerCase()));

  const universityCommunities = [
    { id: 'src', name: 'Student Representative Council', description: 'Your voice at UJ. Stay updated with student governance and representation.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', link: '/src', color: '#2563eb', members: 45 },
    { id: 'sports', name: 'Sports', description: 'From rugby to chess, find all UJ sports teams, schedules, results, and how to join.', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', link: 'https://www.uj.ac.za/sport/', color: '#16a34a', members: 128 },
    { id: 'finance', name: 'Student Finance', description: 'Financial aid, bursaries, budgeting tools, and all money matters for UJ students.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', link: 'https://www.uj.ac.za/admission-aid/student-finance/', color: '#ea580c', members: 89 },
    { id: 'engagement', name: 'Community Engagement', description: 'Make a difference through UJ\'s outreach programs and volunteer opportunities.', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', link: '/engagement', color: '#9333ea', members: 67 },
    { id: 'accommodation', name: 'Student Accommodation', description: 'Find information about UJ residences, off-campus housing, and student living communities.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', link: '/houses', color: '#ca8a04', members: 203 },
    { id: 'gog', name: 'Governing Body', description: 'The Governing Body oversees university policies and strategic direction.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', link: '/gog', color: '#dc2626', members: 34 },
  ];

  const scopeOptions = [
    { value: 'faculty', label: 'My Faculty' }, { value: 'campus', label: 'My Campus' },
    { value: 'university', label: 'All UJ' }, { value: 'different', label: 'Different Campus' },
  ];

  const genderOptions = [
    { value: 'mix', label: 'Mixed' }, { value: 'male', label: 'Males Only' }, { value: 'female', label: 'Females Only' },
  ];

  const getFacultyColor = (dept) => {
    const c = ['Applied Information Systems', 'Business Management', 'Finance & Investment Management', 'Information & Knowledge Management', 'Marketing'];
    if (c.some(d => dept?.includes(d))) return '#2563eb';
    if (dept?.includes('Law')) return '#dc2626';
    if (dept?.includes('Science')) return '#16a34a';
    return '#666';
  };

  const footerTabs = [
    { id: 'home', icon: HomeIcon, label: 'Home', route: '/dashboard' },
    { id: 'communities', icon: CommunitiesTabIcon, label: 'Community', route: '/communities' },
    { id: 'profile', icon: ProfileIcon, label: 'Profile', route: '/profile' },
  ];

  const sectionTabs = [
    { id: 'projects', icon: FolderIcon, label: 'Projects' },
    { id: 'forums', icon: MessageCircleIcon, label: 'Forums' },
    { id: 'groups', icon: UsersIcon, label: 'Groups' },
    { id: 'connect', icon: ConnectPeopleIcon, label: 'Connect' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, padding: '4px', display: 'flex' }}>
          <ArrowLeftIcon />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: theme.text }}>Community</h2>
        <button onClick={() => setShowProjectModal(true)} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SmallPlusIcon /> Create
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ padding: '24px 20px 8px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.text, margin: '0 0 8px', lineHeight: 1.2 }}>
          Build together at UJ
        </h1>
        <p style={{ fontSize: '14px', color: theme.textSecondary, margin: '0 0 20px', lineHeight: 1.5, maxWidth: '400px' }}>
          Join projects, discuss ideas, and connect with your campus community — all in one place.
        </p>

        {/* Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ textAlign: 'center', padding: '12px 8px', background: theme.cardBg, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${theme.border}`, transition: 'transform 0.2s ease', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
              <img src="/C1.png" alt="Post Project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>Post Project</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px 8px', background: theme.cardBg, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${theme.border}`, transition: 'transform 0.2s ease', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
              <img src="/C2.png" alt="Find Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>Find Team</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px 8px', background: theme.cardBg, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${theme.border}`, transition: 'transform 0.2s ease', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
              <img src="/C3.png" alt="Build Together" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>Build Together</div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', background: theme.cardBg, margin: '16px 20px', borderRadius: '12px', padding: '4px', border: `1px solid ${theme.border}`, overflowX: 'auto' }}>
        {sectionTabs.map(section => (
          <button key={section.id} onClick={() => setActiveSection(section.id)} style={{
            flex: 1, padding: '10px 6px', borderRadius: '10px', border: 'none',
            background: activeSection === section.id ? '#FF6B00' : 'transparent',
            color: activeSection === section.id ? 'white' : theme.textSecondary,
            cursor: 'pointer', fontFamily: 'inherit',
            fontWeight: activeSection === section.id ? 600 : 500, fontSize: '12px',
            transition: 'all 0.2s ease', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '5px', whiteSpace: 'nowrap', minWidth: '60px'
          }}>
            <section.icon /> {section.label}
          </button>
        ))}
      </div>

      {/* PROJECTS SECTION */}
      {activeSection === 'projects' && (
        <>
          <div style={{ padding: '0 20px 12px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {projectFilters.map(filter => (
              <button key={filter} onClick={() => setProjectFilter(filter)} style={{
                padding: '6px 14px', borderRadius: '20px', border: projectFilter === filter ? 'none' : `1.5px solid ${theme.border}`,
                background: projectFilter === filter ? '#FF6B00' : 'transparent', color: projectFilter === filter ? 'white' : theme.textSecondary,
                fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap'
              }}>{filter}</button>
            ))}
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            {filteredProjects.length === 0 ? (
              <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '14px', padding: '40px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>No projects yet. Be the first to start one!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredProjects.map(project => (
                  <div key={project.id} style={{ background: theme.cardBg, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${theme.border}`, cursor: 'pointer', transition: 'transform 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        {project.tags?.map((tag, i) => (
                          <span key={i} style={{ background: '#FFF7ED', color: '#FF6B00', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '6px' }}>{project.name}</h3>
                      <p style={{ fontSize: '13px', color: theme.textSecondary, marginBottom: '12px', lineHeight: 1.4 }}>{project.description || 'No description'}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.textSecondary, fontSize: '12px' }}>
                          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: project.profile_pic ? `url(${project.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '11px' }}>
                            {(project.preferred_name || project.full_name || '?').charAt(0)}
                          </div>
                          <span>{project.preferred_name || project.full_name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: theme.textSecondary, display: 'flex', alignItems: 'center' }}><LinkIcon /></a>
                          )}
                          <button style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Join</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* FORUMS SECTION */}
      {activeSection === 'forums' && (
        <>
          <div style={{ padding: '0 20px 12px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {forumFilters.map(filter => (
              <button key={filter} onClick={() => setForumFilter(filter)} style={{
                padding: '6px 14px', borderRadius: '20px', border: forumFilter === filter ? 'none' : `1.5px solid ${theme.border}`,
                background: forumFilter === filter ? '#FF6B00' : 'transparent', color: forumFilter === filter ? 'white' : theme.textSecondary,
                fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap'
              }}>{filter}</button>
            ))}
          </div>
          <div style={{ padding: '0 20px 20px' }}>
            {filteredForums.length === 0 ? (
              <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '14px', padding: '40px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>No forum discussions yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredForums.map(forum => (
                  <div key={forum.id} style={{ background: theme.cardBg, borderRadius: '14px', padding: '16px', border: `1px solid ${theme.border}`, cursor: 'pointer', transition: 'transform 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: theme.text, margin: 0, flex: 1, marginRight: '12px' }}>{forum.title}</h3>
                      <span style={{ fontSize: '11px', color: theme.textSecondary, whiteSpace: 'nowrap' }}>{forum.time}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: theme.textSecondary, marginBottom: '10px', lineHeight: 1.4 }}>{forum.content}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {forum.tags?.map((tag, i) => (
                          <span key={i} style={{ fontSize: '10px', color: '#FF6B00', background: '#FFF7ED', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: theme.textSecondary }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircleIcon /> {forum.replies}</span>
                        <span style={{ fontWeight: 500 }}>by {forum.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* COMMUNITY GROUPS SECTION */}
      {activeSection === 'groups' && (
        <>
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {universityCommunities.map(group => (
                <div key={group.id} onClick={() => { if (group.link.startsWith('http')) { window.open(group.link, '_blank'); } else { navigate(group.link); } }}
                  style={{ background: theme.cardBg, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${theme.border}`, cursor: 'pointer', transition: 'transform 0.15s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: '110px', background: `url(${group.image}) center/cover`, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7))` }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: group.color, color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>{group.members} members</div>
                    <h3 style={{ position: 'absolute', bottom: '12px', left: '16px', color: 'white', fontSize: '17px', fontWeight: 700, margin: 0, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{group.name}</h3>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: '13px', color: theme.textSecondary, margin: '0 0 12px', lineHeight: 1.4 }}>{group.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button style={{ background: group.color, color: 'white', border: 'none', padding: '7px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Explore</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '20px', borderTop: `1px solid ${theme.border}`, margin: '0 20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: theme.text, marginBottom: '12px' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { label: 'UJ Main Website', link: 'https://www.uj.ac.za' }, { label: 'Student Portal', link: 'https://student.uj.ac.za' },
                { label: 'Library', link: 'https://www.uj.ac.za/library' }, { label: 'Timetables', link: 'https://www.uj.ac.za/timetables' },
                { label: 'SRC', link: '/src' }, { label: 'Sports', link: 'https://www.uj.ac.za/sport/' },
                { label: 'Finance', link: 'https://www.uj.ac.za/admission-aid/student-finance/' }, { label: 'Housing', link: '/houses' },
              ].map((link, i) => (
                <a key={i} href={link.link.startsWith('http') ? link.link : '#'} target={link.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  onClick={(e) => { if (!link.link.startsWith('http')) { e.preventDefault(); navigate(link.link); } }}
                  style={{ padding: '6px 12px', background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', fontSize: '12px', color: theme.textSecondary, textDecoration: 'none', fontWeight: 500 }}>{link.label}</a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CONNECT SECTION */}
      {activeSection === 'connect' && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <PlusCircleIcon />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, margin: 0 }}>Meet New People</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>Where from?</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {scopeOptions.map(opt => (
                  <button key={opt.value} onClick={() => setMeetFilters(prev => ({ ...prev, scope: opt.value }))} style={{
                    padding: '6px 12px', borderRadius: '20px', border: meetFilters.scope === opt.value ? 'none' : `1.5px solid ${theme.border}`,
                    background: meetFilters.scope === opt.value ? '#FF6B00' : 'transparent', color: meetFilters.scope === opt.value ? 'white' : theme.textSecondary,
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                  }}>{opt.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>Who?</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {genderOptions.map(opt => (
                  <button key={opt.value} onClick={() => setMeetFilters(prev => ({ ...prev, gender: opt.value }))} style={{
                    padding: '6px 12px', borderRadius: '20px', border: meetFilters.gender === opt.value ? 'none' : `1.5px solid ${theme.border}`,
                    background: meetFilters.gender === opt.value ? '#FF6B00' : 'transparent', color: meetFilters.gender === opt.value ? 'white' : theme.textSecondary,
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                  }}>{opt.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: '6px' }}>How many? ({meetFilters.groupSize})</label>
              <input type="range" min="1" max="6" value={meetFilters.groupSize} onChange={e => setMeetFilters(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))} style={{ width: '100%', accentColor: '#FF6B00' }} />
            </div>
            <button onClick={handleFindPeople} disabled={loadingPeople} style={{
              width: '100%', padding: '14px', background: '#FF6B00', color: 'white', border: 'none',
              borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: loadingPeople ? 0.7 : 1
            }}>{loadingPeople ? 'Finding people...' : 'Find People'}</button>
          </div>

          {matchedPeople.length > 0 && (
            <div style={{ position: 'relative', width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', border: `1px dashed ${theme.border}`, animation: 'spin 30s linear infinite' }} />
              <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: `1px dashed ${theme.border}`, animation: 'spin 20s linear infinite reverse' }} />
              <div style={{ zIndex: 2, textAlign: 'center', background: theme.bg, padding: '16px', borderRadius: '50%', width: '90px', height: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: theme.text }}>Meet</div>
                <div style={{ fontSize: '11px', color: theme.textSecondary }}>Tap +</div>
              </div>
              {matchedPeople.map((person, i) => {
                const total = matchedPeople.length;
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                const radius = 110;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div key={person.id} onClick={() => handleAddPerson(person)} style={{ position: 'absolute', transform: `translate(${x}px, ${y}px)`, cursor: 'pointer', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: person.profile_pic ? `url(${person.profile_pic}) center/cover` : getFacultyColor(person.department), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '18px', border: `3px solid ${theme.bg}`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', animation: 'float 3s ease-in-out infinite', animationDelay: `${i * 0.5}s`, position: 'relative' }}>
                      {!person.profile_pic && (person.preferred_name || person.full_name || '?').charAt(0)}
                      <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '20px', height: '20px', borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${theme.bg}` }}>
                        <span style={{ color: 'white', fontSize: '12px', lineHeight: 1, fontWeight: 700 }}>+</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '10px', color: theme.textSecondary, fontWeight: 500, maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }}>{person.preferred_name || person.full_name}</span>
                  </div>
                );
              })}
            </div>
          )}

          {addedUsers.length > 0 && (
            <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: theme.textSecondary, marginBottom: '10px' }}>Added ({addedUsers.length})</div>
              {addedUsers.map(person => (
                <div key={person.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: getFacultyColor(person.department), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '14px' }}>
                    {(person.preferred_name || person.full_name || '?').charAt(0)}
                  </div>
                  <span style={{ fontSize: '14px', color: theme.text, flex: 1 }}>{person.preferred_name || person.full_name}</span>
                  <button onClick={() => navigate('/messages')} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Chat</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Create Modal */}
      {showProjectModal && (
        <div onClick={() => setShowProjectModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.bg, borderRadius: 20, padding: 24, width: '100%', maxWidth: 450 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16, textAlign: 'center' }}>Start a Project</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" placeholder="Project name" value={projectForm.name} onChange={e => setProjectForm({ ...projectForm, name: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <textarea placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <input type="text" placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <input type="url" placeholder="Project link (optional)" value={projectForm.link} onChange={e => setProjectForm({ ...projectForm, link: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', background: theme.inputBg, color: theme.text }} />
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setShowProjectModal(false)} style={{ flex: 1, padding: 12, background: theme.cardBg, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: theme.textSecondary }}>Cancel</button>
                <button onClick={handleCreateProject} disabled={creatingProject || !projectForm.name.trim()} style={{ flex: 1, padding: 12, background: '#FF6B00', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: creatingProject ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: creatingProject || !projectForm.name.trim() ? 0.5 : 1 }}>{creatingProject ? 'Creating...' : 'Create Project'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, background: theme.bg, borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100, paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {footerTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = (tab.id === 'communities');
          return (
            <button key={tab.id} onClick={() => navigate(tab.route)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}>
              <Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>
    </div>
  );
};

export default Communities;