import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Globe, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to GlobalWeChat</h1>
      <p className="text-xl mb-8">Connect with anyone, anywhere, anytime.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Globe className="w-12 h-12 text-blue-500" />}
          title="Global Connections"
          description="Chat with people from all around the world instantly."
        />
        <FeatureCard
          icon={<MessageCircle className="w-12 h-12 text-green-500" />}
          title="Auto-Translation"
          description="Communicate effortlessly across languages with real-time translation."
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-purple-500" />}
          title="Safe Environment"
          description="Enjoy a moderated and secure chatting experience."
        />
      </div>
      
      <Link
        to="/chat"
        className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Start Chatting Now
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Home;