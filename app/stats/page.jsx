'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#eab308', '#3b82f6'];

export default function Stats() {
    const [data, setData] = useState([
        { name: 'Call', value: 0 },
        { name: 'Text', value: 0 },
        { name: 'Video', value: 0 }
    ]);

    useEffect(() => {
        const timeline = JSON.parse(localStorage.getItem('keenkeeper_timeline') || '[]');

        const counts = {
            Call: 0,
            Text: 0,
            Video: 0
        };

        timeline.forEach(entry => {
            if (counts[entry.type] !== undefined) counts[entry.type]++;
        });

        setData([
            { name: 'Call', value: counts.Call },
            { name: 'Text', value: counts.Text },
            { name: 'Video', value: counts.Video }
        ]);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-4">Friendship Analytics</h1>
            <p className="text-gray-500 mb-12">By Interaction Type</p>

            <div className="bg-white rounded-3xl p-12 shadow">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={140}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-10 text-center text-gray-500 text-sm">
                Total interactions logged: {data.reduce((sum, item) => sum + item.value, 0)}
            </div>
        </div>
    );
}