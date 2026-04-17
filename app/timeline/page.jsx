'use client';
import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Video, Handshake } from 'lucide-react';

export default function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
        saved.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTimeline(saved);
    }, []);

    const filteredTimeline = filter === 'All'
        ? timeline
        : timeline.filter(entry => entry.type === filter);

    const getIcon = (type) => {
        switch (type) {
            case 'Call': return <Phone className="text-blue-600" size={22} />;
            case 'Text': return <MessageCircle className="text-green-600" size={22} />;
            case 'Video': return <Video className="text-purple-600" size={22} />;
            default: return <Handshake className="text-amber-600" size={22} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-semibold text-gray-900 mb-8">Timeline</h1>

                <div className="mb-10">
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-gray-700 appearance-none focus:outline-none focus:border-emerald-500 cursor-pointer"
                        >
                            <option value="All">Filter timeline</option>
                            <option value="Call">Call</option>
                            <option value="Text">Text</option>
                            <option value="Video">Video</option>
                        </select>
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">▼</div>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredTimeline.length === 0 ? (
                        <div className="bg-white rounded-3xl p-16 text-center">
                            <p className="text-gray-400 text-lg">No interactions found</p>
                        </div>
                    ) : (
                        filteredTimeline.map((entry) => (
                            <div
                                key={entry.id}
                                className="bg-white rounded-3xl p-5 flex items-center gap-5 shadow-sm hover:shadow transition-all border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    {getIcon(entry.type)}
                                </div>

                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-[17px]">{entry.title}</p>
                                    <p className="text-gray-500 text-sm mt-0.5">{entry.date}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}