import { useAuth } from '../context/AuthContext.jsx';
import { useDonations } from '../context/DonationContext.jsx';
import { Package, MapPin, Clock, CheckCircle2, User } from 'lucide-react';
import { formatDate } from '../lib/utils.js';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const { donations, updateDonationStatus } = useDonations();

  const availableDonations = donations.filter(d => d.status === 'AVAILABLE');
  const myPickups = donations.filter(d => d.volunteerId === user?.id);

  const handleAccept = async (id) => {
    try {
      await updateDonationStatus(id, 'ACCEPTED', user?.id, user?.name);
    } catch (error) {
      console.error(error);
      alert('Failed to accept pickup.');
    }
  };

  const handleCollected = async (id) => {
    try {
      await updateDonationStatus(id, 'COLLECTED');
    } catch (error) {
      console.error(error);
      alert('Failed to mark as collected.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
        <p className="text-gray-600">Help deliver food to those in need</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Donations */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            Available for Pickup
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableDonations.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">No donations currently available.</p>
              </div>
            ) : (
              availableDonations.map((donation) => (
                <div key={donation.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={donation.imageUrl || 'https://picsum.photos/seed/food/400/300'}
                      alt={donation.foodName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{donation.foodName}</h3>
                    <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                      <User className="w-3 h-3" /> Donor: {donation.donorName}
                    </p>
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
                    <button
                      onClick={() => handleAccept(donation.id)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Accept Pickup
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Pickups */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            My Pickups
          </h2>
          
          <div className="space-y-4">
            {myPickups.length === 0 ? (
              <div className="py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-sm">You haven&apos;t accepted any pickups yet.</p>
              </div>
            ) : (
              myPickups.map((pickup) => (
                <div key={pickup.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900">{pickup.foodName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      pickup.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {pickup.status}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {pickup.location}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Package className="w-3 h-3" /> {pickup.quantity}
                    </p>
                  </div>
                  {pickup.status === 'ACCEPTED' && (
                    <button
                      onClick={() => handleCollected(pickup.id)}
                      className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                    >
                      Mark as Collected
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
