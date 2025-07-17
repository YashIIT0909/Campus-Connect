'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { hostelList } from '@/schema/signUpSchema';
import axios from 'axios';

export default function CompleteProfile() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [admissionNumber, setAdmissionNumber] = useState('');
    const [hostel, setHostel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/complete-profile', {
                email,
                admissionNumber,
                hostel
            });
            if (response.status !== 200) {
                throw new Error(response.data.message || 'Failed to update profile');
            }

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-2xl font-bold text-white mb-6">Complete Your Profile</h1>
                <p className="text-gray-300 mb-6">
                    Please provide the following information to complete your registration.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="admissionNumber" className="block text-sm font-medium text-gray-300 mb-1">
                            Admission Number
                        </label>
                        <input
                            id="admissionNumber"
                            type="text"
                            value={admissionNumber}
                            onChange={(e) => setAdmissionNumber(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="hostel" className="block text-sm font-medium text-gray-300 mb-1">
                            Hostel
                        </label>
                        <select
                            id="hostel"
                            value={hostel}
                            onChange={(e) => setHostel(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                            required
                        >
                            <option value="" disabled>Select Hostel</option>
                            {hostelList.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Complete Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}