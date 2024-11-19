import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatHeader from './ChatHeader.tsx';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username] = useState('You');
  const botName = "ChatBot";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: username,
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Fetch the bot's response from the server
    const botResponse = await fetchBotResponse(content);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: botName,
      content: botResponse,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const fetchBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      return data.reply || "Sorry, I couldn't understand that.";
    } catch (error) {
      console.error('Error getting bot response:', error);
      return "Sorry, something went wrong.";
    }
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
