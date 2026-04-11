import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext.jsx';
import { donationService } from '../services/api.js';

const DonationContext = createContext(undefined);

export function DonationProvider({ children }) {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const refreshDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await donationService.getAll();
      setDonations(data);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDonations();
  }, [refreshDonations]);

  const addDonation = async (data) => {
    if (!user) return;
    try {
      const newDonation = await donationService.create({
        ...data,
        donorId: user.id,
        donorName: user.name,
      });
      setDonations(prev => [newDonation, ...prev]);
    } catch (error) {
      console.error('Failed to add donation:', error);
      throw error;
    }
  };

  const updateDonationStatus = async (donationId, status, volunteerId, volunteerName) => {
    try {
      const updatedDonation = await donationService.updateStatus(donationId, status, volunteerId, volunteerName);
      setDonations(prev => prev.map(d => d.id === donationId ? updatedDonation : d));
    } catch (error) {
      console.error('Failed to update donation status:', error);
      throw error;
    }
  };

  const deleteDonation = async (donationId) => {
    try {
      await donationService.delete(donationId);
      setDonations(prev => prev.filter(d => d.id !== donationId));
    } catch (error) {
      console.error('Failed to delete donation:', error);
      throw error;
    }
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation, updateDonationStatus, deleteDonation, refreshDonations, isLoading }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
}
