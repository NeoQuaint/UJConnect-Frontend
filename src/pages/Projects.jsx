import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [projects, setProjects] = useState([]);
  const [projectFilter, setProjectFilter] = useState('All');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', tags: '', link: '' });
  const [creatingProject, setCreatingProject] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hi! I can help you find projects you might be interested in. Tell me what you\'re looking for!' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ujconnect_dark_mode') === 'true');

  useEffect(() => {
    fetchUserProfile();
    fetchProjects();
    const onStorage = () => setDarkMode(localStorage.getItem('ujconnect_dark_mode') === 'true');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`);
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
    } catch (err) {}
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/projects`);
      setProjects(data || []);
    } catch (err) {}
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

  const handleChatSend = async () => {
    if (!chatMessage.trim()) return;
    const userMessage = chatMessage.trim();
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatMessage('');
    setChatLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: userMessage,
        history: chatHistory.slice(-10)
      });
      setChatHistory(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting. Try again later!' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#f5f5f5',
    inputBg: darkMode ? '#1a1a1a' : '#f5f5f5',
  };

  const projectFilters = ['All', 'Business', 'Design', 'Tech', 'Hospitality', 'Science', 'Law'];
  const filteredProjects = projectFilter === 'All'
    ? projects
    : projects.filter(p => p.tags?.some(t => t.toLowerCase() === projectFilter.toLowerCase()));

  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'projects', icon: ProjectsIcon, label: 'Projects' },
    { id: 'communities', icon: CommunitiesIcon, label: 'Communities' },
    { id: 'forums', icon: ForumsIcon, label: 'Forums' },
    { id: 'messages', icon: MessagesIcon, label: 'Messages' },
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'home') { navigate('/dashboard'); }
    else if (tabId === 'projects') { return; }
    else { navigate(`/${tabId}`); }
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, padding: '4px', display: 'flex' }}>
          <ArrowLeftIcon />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: theme.text }}>Projects</h2>
        <button onClick={() => setShowProjectModal(true)} style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SmallPlusIcon /> Start
        </button>
      </div>

      {/* Feature Cards with Images */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ textAlign: 'center', padding: '12px 8px', background: theme.cardBg, borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/C1.png" alt="Post Project" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>Post Project</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px 8px', background: theme.cardBg, borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/C2.png" alt="Find Team" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>Find Team</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px 8px', background: theme.cardBg, borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/C3.png" alt="Build Together" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: theme.text }}>Build Together</div>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: theme.text, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '18px' }}>🤖</span> Project Assistant
        </div>
        <div style={{ background: theme.cardBg, borderRadius: '12px', padding: '12px', maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
          {chatHistory.map((msg, i) => (
            <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: '16px',
                background: msg.role === 'user' ? '#FF6B00' : (darkMode ? '#222' : '#f0f0f0'),
                color: msg.role === 'user' ? 'white' : theme.text,
                fontSize: '13px',
                lineHeight: 1.4,
                borderBottomLeftRadius: msg.role === 'assistant' ? '16px' : '16px',
                borderBottomRightRadius: msg.role === 'user' ? '16px' : '16px',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
              <div style={{ padding: '10px 14px', borderRadius: '16px', background: darkMode ? '#222' : '#f0f0f0', color: theme.textSecondary, fontSize: '13px' }}>
                Thinking...
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="What kind of project are you looking for?"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
            style={{ flex: 1, padding: '10px 14px', border: `1.5px solid ${theme.border}`, borderRadius: '20px', fontSize: '13px', fontFamily: 'inherit', background: theme.inputBg, color: theme.text, outline: 'none' }}
          />
          <button onClick={handleChatSend} disabled={chatLoading || !chatMessage.trim()} style={{ background: '#FF6B00', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: chatLoading || !chatMessage.trim() ? 0.5 : 1 }}>
            <SendIcon />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {projectFilters.map(filter => (
          <button key={filter} onClick={() => setProjectFilter(filter)} style={{
            padding: '6px 14px', borderRadius: '20px', border: projectFilter === filter ? 'none' : `1.5px solid ${theme.border}`,
            background: projectFilter === filter ? '#FF6B00' : 'transparent',
            color: projectFilter === filter ? 'white' : theme.textSecondary,
            fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap'
          }}>
            {filter}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div style={{ padding: '16px 20px' }}>
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '15px', padding: '40px 0' }}>
            No projects yet. Be the first to start one!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredProjects.map(project => (
              <div key={project.id} style={{ background: theme.cardBg, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${theme.border}`, cursor: 'pointer' }}>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {project.tags?.map((tag, i) => (
                      <span key={i} style={{ background: '#FFF7ED', color: '#FF6B00', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: theme.text, marginBottom: '8px' }}>{project.name}</h3>
                  <p style={{ fontSize: '14px', color: theme.textSecondary, marginBottom: '12px', lineHeight: 1.4 }}>{project.description || 'No description'}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: theme.textSecondary, fontSize: '13px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: project.profile_pic ? `url(${project.profile_pic}) center/cover` : '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '12px' }}>
                        {(project.preferred_name || project.full_name || '?').charAt(0)}
                      </div>
                      <span>{project.preferred_name || project.full_name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: theme.textSecondary, display: 'flex', alignItems: 'center' }}><LinkIcon /></a>
                      )}
                      <button style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
        {tabs.map(tab => { const Icon = tab.icon; const isActive = (tab.id === 'projects'); return (<button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? '#FF6B00' : theme.textSecondary, fontFamily: 'inherit', transition: 'color 0.2s' }}><Icon /><span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span></button>); })}
      </div>
    </div>
  );
};

export default Projects;