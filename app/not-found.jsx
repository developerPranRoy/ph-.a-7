import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-gray-500 max-w-md mb-10">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="bg-green-600 text-white px-8 py-4 rounded-2xl font-medium hover:bg-green-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}