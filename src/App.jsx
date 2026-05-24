import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Communities from './pages/Communities';
import Forums from './pages/Forums';
import Messages from './pages/Messages';

function App() {
  const user = localStorage.getItem('ujconnect_user');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/profile/:userId" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/projects" element={user ? <Projects /> : <Navigate to="/" />} />
        <Route path="/communities" element={user ? <Communities /> : <Navigate to="/" />} />
        <Route path="/forums" element={user ? <Forums /> : <Navigate to="/" />} />
        <Route path="/messages" element={user ? <Messages /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;