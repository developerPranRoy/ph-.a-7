'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');
        saved.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTimeline(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('keenkeeper_timeline', JSON.stringify(timeline));
    }, [timeline]);

    const addToTimeline = (newEntry) => {
        setTimeline(prev => [newEntry, ...prev]);
    };

    const getFriendTimeline = (friendId) => {
        return timeline.filter(entry => entry.friendId === friendId);
    };

    return (
        <TimelineContext.Provider value={{
            timeline,
            addToTimeline,
            getFriendTimeline
        }}>
            {children}
        </TimelineContext.Provider>
    );
}

export const useTimeline = () => useContext(TimelineContext);