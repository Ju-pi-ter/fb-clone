import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { useAuth } from '../context/AuthContext'
import axios from 'axios';

const Chats = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const {user} = useAuth()
    const handleClick = async () => {
        await auth.signOut()
        navigate('/')

        
    }
        const getFile = async (url) => {
             const response = await fetch(url)
             const data = await response.blob()
             return new File([data], 'userPhoto.jpeg', {type:'image/jpeg'})
        }
    useEffect(()=> {
        if(!user) {
            navigate('/')
            return;
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'ProjectId': 'f9319b4f-cb74-4c04-a8d8-37f58784af71',
                'user-name': 'user.email',
                'user-secret': 'user.uid',
                
            }
        }).then(() => setLoading(false))
        .catch(()=> {
            let formdata = new FormData()
            formdata.append('email','user.email')
            formdata.append('username', 'user.displayName')
            formdata.append('secret', 'user.uuid')
            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)
                axios.post('https://api.chatengine.io/users', 
                formdata, {headers: {'private-key' : 'cdffcdcf-fe75-4168-89f2-2e7445f8fe3f'} 
                })
                .then(()=> setLoading(false))
                .catch((error) => console.log(error))
            })
            
                    
        })
    }, [user, navigate])

        if(!user || loading) return 'loading...'
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
            userName='user.email'
             userSecret='user.uuid' />

        </div>
    )
}

export default Chats