import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Chats = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleClick = async () => {
    await auth.signOut();
    navigate('/');
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], 'userPhoto.jpeg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const response = await axios.get('https://api.chatengine.io/users/me/', {
          headers: {
            'ProjectId': 'f9319b4f-cb74-4c04-a8d8-37f58784af71',
            'user-name': user.email,
            'user-secret': user.uid,
          },
        });

        setLoading(false);
        console.log('User data:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);

        if (error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
        }

        // If the user doesn't exist, create a new one
        if (error.response && error.response.status === 404) {
          try {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret', user.uid);
            const avatar = await getFile(user.photoURL);
            formdata.append('avatar', avatar, avatar.name);

            // Create a new user
            await axios.post('https://api.chatengine.io/users', formdata, {
              headers: {'private-key': 'cdffcdcf-fe75-4168-89f2-2e7445f8fe3f'},
            });

            setLoading(false);
          } catch (createError) {
            console.error('Error creating user:', createError);
          }
        }
      }
    };

    if (!user) {
      navigate('/');
      return;
    }

    fetchData();
  }, [user, navigate]);

  if (!user || loading) return 'Loading...';

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className="logo-tab">
          FBMCLONE
        </div>
        <div className="logout-tab" onClick={handleClick}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(1000vh - 66px)'
        projectID='f9319b4f-cb74-4c04-a8d8-37f58784af71'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
