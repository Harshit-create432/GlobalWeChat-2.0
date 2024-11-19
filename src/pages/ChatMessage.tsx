import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}
      role="listitem"
    >
      <div
        className={`
          max-w-[70%] break-words p-4 shadow-sm
          transition-all duration-200 hover:shadow-md
          ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl'
              : 'bg-white text-gray-800 rounded-t-2xl rounded-br-2xl'
          }
        `}
      >
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm">
            {isOwnMessage ? 'You' : message.sender}
          </span>
          <time className="text-xs opacity-75">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </time>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;