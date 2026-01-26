import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Menu, LogOut, Settings } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const handleNavigateToSettings = () => {
    setShowUserMenu(false);
    navigate('/settings');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu and Logo */}
          <div className="flex items-center space-x-3">
            {/* Hamburger Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Logo and Title */}
            <Zap className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Pivot</h1>
              <p className="text-primary-100 text-sm">Accelerate Your Career</p>
            </div>
          </div>

          {/* Right Side - User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 flex items-center justify-center text-2xl">
                {user?.avatar || '👤'}
              </div>
              <span className="text-sm font-medium hidden md:inline">{user?.name || 'Guest'}</span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.role}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleNavigateToSettings}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

