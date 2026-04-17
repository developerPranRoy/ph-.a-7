export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-white py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">K</span>
                    </div>
                    <h2 className="font-semibold text-xl">KeenKeeper</h2>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                    Your personal tool to maintain meaningful connections. Never lose touch again.
                </p>
                <div className="flex justify-center gap-6 text-gray-400">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
                <p className="text-gray-500 text-xs mt-8">
                    © 2026 KeenKeeper. All rights reserved.
                </p>
            </div>
        </footer>
    );
}