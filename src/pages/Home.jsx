import { Link } from 'react-router-dom';
import { Utensils, Heart, ShieldCheck, ArrowRight, Package, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-green-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Reducing Waste, <span className="text-green-600">Feeding Hope.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
              FoodBridge connects surplus food from donors to volunteers who deliver it to those in need. Join our mission to end hunger and reduce food wastage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
          <div className="w-96 h-96 bg-green-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 pointer-events-none">
          <div className="w-96 h-96 bg-green-300 rounded-full"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600">A simple process to make a big difference</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Donors Post Food</h3>
            <p className="text-gray-600">Restaurants, hotels, or individuals list surplus food details and location.</p>
          </div>

          <div className="text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Verifies</h3>
            <p className="text-gray-600">Our team ensures volunteers are verified and donations are monitored.</p>
          </div>

          <div className="text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Volunteers Deliver</h3>
            <p className="text-gray-600">Verified volunteers pick up food and deliver it to local shelters or NGOs.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">1.2k+</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Meals Saved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">450+</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Active Donors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">800+</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Volunteers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">15+</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to make an impact?</h2>
              <p className="text-green-100 mb-10 text-lg max-w-xl mx-auto">
                Whether you have food to share or time to give, your contribution matters.
              </p>
              <Link
                to="/register"
                className="inline-block bg-white text-green-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Join the Community
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Utensils className="w-64 h-64 absolute -top-12 -left-12 rotate-12" />
              <Heart className="w-64 h-64 absolute -bottom-12 -right-12 -rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
