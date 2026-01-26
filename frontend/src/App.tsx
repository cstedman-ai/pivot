import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Progress } from './pages/Progress';
import { ResumeOrg } from './pages/ResumeOrg';
import { Resources } from './pages/Resources';
import { Materials } from './pages/Materials';
import { Organization } from './pages/Organization';
import { Settings } from './pages/Settings';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
              <Header onMenuClick={toggleSidebar} />
              <main className="pt-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/resume-org" element={<ResumeOrg />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/materials" element={<Materials />} />
                  <Route path="/organization" element={<Organization />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;

