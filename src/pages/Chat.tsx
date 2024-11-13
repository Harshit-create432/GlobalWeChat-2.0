import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatHeader from './ChatHeader.tsx';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Alice',
    content: 'Hey everyone! How are you doing today? 👋',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    sender: 'Bob',
    content: 'Hi Alice! Having a great day, thanks for asking! 😊',
    timestamp: new Date(Date.now() - 1000 * 60 * 14),
  },
  {
    id: '3',
    sender: 'Charlie',
    content: 'Just joined! Love the new chat interface! ✨',
    timestamp: new Date(Date.now() - 1000 * 60 * 13),
  },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [username] = useState('You');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: username,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white/20 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20">
      <ChatHeader messageCount={messages.length} />
      
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="list"
        aria-label="Chat messages"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.sender === username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;