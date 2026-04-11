import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { DonationProvider } from './context/DonationContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DonorDashboard from './pages/DonorDashboard.jsx';
import VolunteerDashboard from './pages/VolunteerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

export default function App() {
  return (
    <AuthProvider>
      <DonationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['DONOR']} />}>
                  <Route path="/donor" element={<DonorDashboard />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['VOLUNTEER']} />}>
                  <Route path="/volunteer" element={<VolunteerDashboard />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </main>
            <footer className="bg-white border-t border-gray-200 py-8">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} FoodBridge. Built to reduce food wastage.
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </DonationProvider>
    </AuthProvider>
  );
}
