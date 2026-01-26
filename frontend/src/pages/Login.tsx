import { useNavigate } from 'react-router-dom';
import { Zap, UserCircle, ArrowRight } from 'lucide-react';
import { useUser, User } from '../contexts/UserContext';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Corey Stedman',
    email: 'corey.stedman@pivot.com',
    avatar: '👨‍💻',
    role: 'Senior IT Engineer',
    department: 'IT Infrastructure',
  },
  {
    id: '2',
    name: 'Quade Riley',
    email: 'quade.riley@pivot.com',
    avatar: '👨‍💼',
    role: 'Product Manager',
    department: 'Product',
  },
];

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleUserSelect = (user: User) => {
    login(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="w-16 h-16 text-white" />
            <h1 className="text-6xl font-bold text-white">Pivot</h1>
          </div>
          <p className="text-xl text-primary-100">Accelerate Your Career</p>
          <p className="text-sm text-primary-200 mt-2">Select a user to continue</p>
        </div>

        {/* User Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="group bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-left relative overflow-hidden"
            >
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {user.avatar}
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {user.name}
                </h2>
                <p className="text-gray-600 mb-1 font-medium">{user.role}</p>
                <p className="text-sm text-gray-500 mb-1">{user.department}</p>
                <p className="text-sm text-gray-400">{user.email}</p>

                {/* Arrow Icon */}
                <div className="mt-6 flex items-center space-x-2 text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Continue as {user.name.split(' ')[0]}</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Guest Access Option */}
        <div className="mt-8 text-center">
          <button
            onClick={() => handleUserSelect({
              id: 'guest',
              name: 'Guest User',
              email: 'guest@pivot.com',
              avatar: '👤',
              role: 'Guest',
              department: 'N/A',
            })}
            className="text-white hover:text-primary-200 transition-colors flex items-center space-x-2 mx-auto group"
          >
            <UserCircle className="w-5 h-5" />
            <span className="underline">Continue as Guest</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-primary-200 text-sm">
            © 2025 Pivot - Career Acceleration Platform
          </p>
        </div>
      </div>
    </div>
  );
};

