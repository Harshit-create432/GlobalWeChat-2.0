import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   transition-all duration-200"
        />
        <button
          type="button"
          className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
          aria-label="Emoji"
        >
          <Smile className="w-6 h-6 text-gray-500" />
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full 
                   transition-all duration-200 disabled:opacity-50 
                   hover:shadow-lg active:scale-95"
          disabled={!inputMessage.trim()}
          aria-label="Send message"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;