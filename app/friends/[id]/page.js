'use client';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Phone, MessageCircle, Video, Clock, Archive, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import friendsData from '../../../data/friends.json';

export default function FriendDetails({ params }) {
  const router = useRouter();
  const [friend, setFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const unwrappedParams = React.use(params);
  const id = unwrappedParams?.id ? parseInt(unwrappedParams.id) : null;

  useEffect(() => {
    if (!id || isNaN(id)) {
      router.replace('/not-found');
      return;
    }

    const foundFriend = friendsData.find(f => f.id === id);
    if (!foundFriend) {
      router.replace('/not-found');
      return;
    }

    setFriend(foundFriend);
    setIsLoading(false);
  }, [id, router]);

  const handleQuickCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type,
      title: `${type} with ${friend.name}`,
      friendId: friend.id
    };

    const allTimeline = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
    allTimeline.unshift(newEntry);
    localStorage.setItem('keenkeeper_timeline', JSON.stringify(allTimeline));

    toast.success(`${type} logged successfully!`);
  };

  if (isLoading || !friend) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-32 h-32 rounded-full object-cover shadow-md ring-4 ring-white"
                />

                <h1 className="mt-6 text-3xl font-semibold text-gray-900 tracking-tight">
                  {friend.name}
                </h1>

                <div className="flex gap-3 mt-5">
                  <span className="px-6 py-1.5 bg-emerald-600 text-white text-sm font-semibold rounded-full tracking-wide">
                    ON-TRACK
                  </span>
                  <span className="px-6 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full tracking-wide">
                    {friend.tags?.[0]?.toUpperCase() || 'FRIEND'}
                  </span>
                </div>

                <p className="mt-9 text-gray-600 text-[15.5px] leading-relaxed font-medium">
                  {friend.bio}
                </p>
                <p className="text-sm text-gray-500 mt-5 font-medium">Preferred: email</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 space-y-3">
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-4 rounded-2xl text-sm font-medium text-gray-700">
                  <Clock size={20} />
                  Snooze 2 Weeks
                </button>
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-4 rounded-2xl text-sm font-medium text-gray-700">
                  <Archive size={20} />
                  Archive
                </button>
                <button className="w-full flex items-center justify-center gap-3 border border-red-200 text-red-600 hover:bg-red-50 py-4 rounded-2xl text-sm font-medium">
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-7 text-center shadow-sm">
                <div className="text-5xl font-semibold text-gray-900 tracking-tighter">{friend.days_since_contact}</div>
                <div className="text-sm text-gray-500 mt-2 font-medium">Days Since Contact</div>
              </div>
              <div className="bg-white rounded-3xl p-7 text-center shadow-sm">
                <div className="text-5xl font-semibold text-emerald-600 tracking-tighter">{friend.goal}</div>
                <div className="text-sm text-gray-500 mt-2 font-medium">Goal (Days)</div>
              </div>
              <div className="bg-white rounded-3xl p-7 text-center shadow-sm">
                <div className="text-3xl font-semibold text-gray-900 tracking-tighter">{friend.next_due_date}</div>
                <div className="text-sm text-gray-500 mt-2 font-medium">Next Due</div>
              </div>
            </div>

            {/* Relationship Goal */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Relationship Goal</h3>
                  <p className="text-gray-600 mt-1.5">Connect every <span className="font-semibold text-emerald-600">{friend.goal} days</span></p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-2xl text-black text-sm font-medium hover:bg-gray-50">
                  <Edit2 size={18} /> Edit
                </button>
              </div>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-7 text-gray-900">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-5">
                <button
                  onClick={() => handleQuickCheckIn('Call')}
                  className="flex flex-col items-center gap-3 py-9 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-3xl transition-all group"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                    <Phone size={32} className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Call</span>
                </button>

                <button
                  onClick={() => handleQuickCheckIn('Text')}
                  className="flex flex-col items-center gap-3 py-9 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-3xl transition-all group"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                    <MessageCircle size={32} className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Text</span>
                </button>

                <button
                  onClick={() => handleQuickCheckIn('Video')}
                  className="flex flex-col items-center gap-3 py-9 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 rounded-3xl transition-all group"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                    <Video size={32} className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}