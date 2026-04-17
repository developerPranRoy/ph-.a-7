'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import FriendCard from '../components/FriendCard';
import friendsData from '../data/friends.json';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 800);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status !== 'on-track').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Friends to keep close in your life</h1>
          <p className="text-xl text-green-100 mb-8">
            Never let important relationships fade away
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-2xl font-semibold flex items-center gap-3 mx-auto hover:bg-gray-100 transition">
            Add a Friend
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm">Total Friends</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{totalFriends}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm">On Track</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{onTrack}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm">Need Attention</p>
            <p className="text-4xl font-bold text-orange-600 mt-2">{needAttention}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-gray-500 text-sm">Interactions</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">12</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">Your Friends</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}