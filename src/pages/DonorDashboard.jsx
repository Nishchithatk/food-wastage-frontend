import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useDonations } from '../context/DonationContext.jsx';
import { Plus, Package, MapPin, Clock, Trash2, CheckCircle2, Clock3 } from 'lucide-react';
import { formatDate } from '../lib/utils.js';

export default function DonorDashboard() {
  const { user } = useAuth();
  const { donations, addDonation, deleteDonation, isLoading } = useDonations();
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    location: '',
    expiryTime: '',
    imageUrl: '',
  });

  const myDonations = donations.filter(d => d.donorId === user?.id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-12 shadow-sm text-center">
          <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading donations...</h1>
          <p className="text-gray-500">Please wait while we load your donation list.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDonation(formData);
      setFormData({ foodName: '', quantity: '', location: '', expiryTime: '', imageUrl: '' });
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert('Failed to add donation. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await deleteDonation(id);
      } catch (error) {
        console.error(error);
        alert('Failed to delete donation.');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600">Manage your food donations</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
        >
          <Plus className="w-5 h-5" />
          Donate Food
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Item Name</label>
                <input
                  type="text"
                  required
                  value={formData.foodName}
                  onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g. Fresh Vegetable Salad"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. 5 kg / 10 boxes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.expiryTime}
                    onChange={(e) => setFormData({ ...formData, expiryTime: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Street address, City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  {formData.imageUrl ? (
                    <div className="relative w-full aspect-video">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Post Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myDonations.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No donations yet</h3>
            <p className="text-gray-500">Start by adding your first food donation.</p>
          </div>
        ) : (
          myDonations.map((donation) => (
            <div key={donation.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={donation.imageUrl || 'https://picsum.photos/seed/food/400/300'}
                  alt={donation.foodName}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  donation.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                  donation.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {donation.status}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{donation.foodName}</h3>
                  {donation.status === 'AVAILABLE' && (
                    <button
                      onClick={() => handleDelete(donation.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Donation"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Package className="w-4 h-4" />
                    <span>{donation.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{donation.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Expires: {formatDate(donation.expiryTime)}</span>
                  </div>
                </div>
                
                {donation.status !== 'AVAILABLE' && (
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {donation.status === 'ACCEPTED' ? <Clock3 className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {donation.status === 'ACCEPTED' ? `Accepted by ${donation.volunteerName}` : `Collected by ${donation.volunteerName}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
