'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/timeline', label: 'Timeline', icon: Clock },
        { href: '/stats', label: 'Stats', icon: BarChart3 },
    ];

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">K</span>
                        </div>
                        <h1 className="font-semibold text-2xl text-gray-900">KeenKeeper</h1>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ href, label, icon: Icon }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-medium transition-all
                    ${isActive
                                            ? 'bg-emerald-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden border-t py-4 bg-white">
                        <div className="flex flex-col gap-2 px-2">
                            {navLinks.map(({ href, label, icon: Icon }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-medium transition-all
                      ${isActive
                                                ? 'bg-emerald-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon size={22} />
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}