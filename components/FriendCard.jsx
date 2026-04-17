import { Calendar } from 'lucide-react';

export default function FriendCard({ friend }) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'overdue':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'almost due':
        return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'on-track':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'on-track': return 'On-Track';
      case 'almost due': return 'Almost Due';
      case 'overdue': return 'Overdue';
      default: return status;
    }
  };

  return (
    <div 
      onClick={() => window.location.href = `/friends/${friend.id}`}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 active:scale-[0.98]"
    >
      <div className="flex justify-center mb-5">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md"
        />
      </div>

      <h3 className="text-center font-semibold text-lg text-gray-900 mb-1">
        {friend.name}
      </h3>

      <div className="flex items-center justify-center gap-1.5 text-gray-500 text-sm mb-5">
        <Calendar size={17} />
        <span>{friend.days_since_contact}d ago</span>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {friend.tags?.map((tag, index) => (
          <span 
            key={index}
            className="text-[10px] bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium tracking-wide"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <div className={`px-8 py-2 text-sm font-semibold rounded-full transition-all ${getStatusStyle(friend.status)}`}>
          {getStatusText(friend.status)}
        </div>
      </div>
    </div>
  );
}