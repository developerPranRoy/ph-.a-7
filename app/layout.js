import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';
import { TimelineProvider } from '../context/TimelineContext';  

export const metadata = {
  title: 'KeenKeeper - Keep Your Friendships Alive',
  description: 'Never lose touch with the people who matter',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <TimelineProvider>                   
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </TimelineProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}