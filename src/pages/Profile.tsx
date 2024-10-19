import React, { useState } from 'react';
import { User, Globe, MessageCircle } from 'lucide-react';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    language: 'English',
    interests: ['Travel', 'Technology', 'Music'],
    totalChats: 42,
    countriesConnected: 15,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Your Profile</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <User className="w-16 h-16 text-blue-500 mr-4" />
            <div>
              <h3 className="text-2xl font-semibold">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Preferred Language</h4>
            <p className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-500" />
              {user.language}
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Interests</h4>
            <div className="flex flex-wrap">
              {user.interests.map((interest, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.totalChats}</p>
              <p className="text-gray-600">Total Chats</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.countriesConnected}</p>
              <p className="text-gray-600">Countries Connected</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;