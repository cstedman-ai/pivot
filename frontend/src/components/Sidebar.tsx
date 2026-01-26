import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  FileText, 
  BookOpen, 
  Folder,
  Building2,
  Settings,
  Info,
  Bug,
  X 
} from 'lucide-react';
import { aboutContent, renderSectionContent } from './partials/aboutContent';
import { DebugContent } from './DebugPanel';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/resume-org', icon: FileText, label: 'Resume' },
    { path: '/resources', icon: BookOpen, label: 'Resources' },
    { path: '/materials', icon: Folder, label: 'Materials' },
    { path: '/organization', icon: Building2, label: 'Organization' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '280px' }}
      >
        <div className="flex flex-col h-full pt-24">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Pivot</h2>
                <p className="text-xs text-gray-500">Navigation</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setShowDebug(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors mb-2"
            >
              <Bug className="w-4 h-4" />
              <span className="font-medium">Debug Tools</span>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors mb-3"
            >
              <Info className="w-4 h-4" />
              <span className="font-medium">About Pivot</span>
            </button>
            <div className="text-xs text-gray-500 text-center">
              <p>Pivot v1.0</p>
              <p>Career Acceleration Platform</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Debug Modal */}
      {showDebug && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowDebug(false)}
          />

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                  <Bug className="w-8 h-8 text-white" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Debug Information</h2>
                    <p className="text-sm text-yellow-100">System diagnostics and logs</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDebug(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-88px)]">
                <DebugContent />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowAbout(false)}
          />

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-lg">P</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{aboutContent.title}</h2>
                    <p className="text-sm text-primary-100">{aboutContent.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAbout(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-88px)]">
                {aboutContent.sections.map((section) => (
                  <div key={section.id} className="mb-6">
                    {section.title && (
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                        <span className="text-2xl mr-2">{section.icon}</span>
                        {section.title}
                      </h3>
                    )}
                    {renderSectionContent(section)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

