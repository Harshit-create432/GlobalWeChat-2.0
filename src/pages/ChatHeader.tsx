import React from 'react';
import { Users } from 'lucide-react';

interface ChatHeaderProps {
  messageCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ messageCount }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="font-semibold text-gray-800">Global Chat</h2>
            <p className="text-sm text-gray-500">{messageCount} messages</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Online</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;