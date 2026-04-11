import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LogOut, Menu, X, Utensils } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-green-600 font-bold text-xl">
              <Utensils className="w-6 h-6" />
              <span>FoodBridge</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600 text-sm">
                  Hello, <span className="font-semibold">{user.name}</span> ({user.role})
                </span>
                {user.role === 'DONOR' && (
                  <Link to="/donor" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
                )}
                {user.role === 'VOLUNTEER' && (
                  <Link to="/volunteer" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Admin Panel</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Login</Link>
                <Link to="/register" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-2 px-4 space-y-1">
          {user ? (
            <>
              <div className="px-3 py-2 text-gray-600 text-sm border-b border-gray-100 mb-2">
                Logged in as <span className="font-semibold">{user.name}</span>
              </div>
              {user.role === 'DONOR' && (
                <Link to="/donor" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">Dashboard</Link>
              )}
              {user.role === 'VOLUNTEER' && (
                <Link to="/volunteer" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">Dashboard</Link>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">Admin Panel</Link>
              )}
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-green-600 font-medium hover:bg-green-50 rounded-md">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
