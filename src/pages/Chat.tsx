import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import axios from 'axios';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    connectToChat();
    return () => {
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToChat = async () => {
    try {
      await fetchEventSource('/api/chat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection opened");
            setIsConnected(true);
          } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
            console.error("Client-side error:", res.statusText);
          }
        },
        onmessage(event) {
          const newMessage = JSON.parse(event.data);
          setMessages(prevMessages => [...prevMessages, newMessage]);
        },
        onclose() {
          console.log("Connection closed by the server");
          setIsConnected(false);
        },
        onerror(err) {
          console.error("There was an error from the server", err);
          setIsConnected(false);
        },
      });
    } catch (error) {
      console.error("Failed to connect to chat:", error);
      setIsConnected(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendToChatbot = async (message: string) => {
    try {
      const response = await axios.post('http://localhost:5000/chat', { message: message });
      const content = response.data.content;
      return {
        id: Date.now().toString(),
        sender: 'ChatBot',
        content: content,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      return {
        id: Date.now().toString(),
        sender: 'ChatBot',
        content: 'Sorry, there was an error with the chatbot service.',
        timestamp: new Date(),
      };
    }
  };

  const handleSendMessage = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    console.log('handleSendMessage triggered');  // Debug line
    if (inputMessage.trim() && isConnected) { // Ensure isConnected is true
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
      const chatbotResponse = await sendToChatbot(inputMessage);
      setMessages(prevMessages => [...prevMessages, chatbotResponse]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <p className="font-semibold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs mt-1">{message.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center border-t p-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage(e);  // Trigger handleSendMessage on Enter
            }
          }}
          placeholder="Type a message..."
          className="flex-1 border rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" className="bg-gray-100 p-2 rounded-full">
          <Smile className="w-6 h-6 text-gray-500" />
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-full ml-2">
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
