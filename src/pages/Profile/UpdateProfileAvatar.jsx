import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AvatarForm } from '../../components/organisms/AvatarForm';

export const UpdateProfileAvatar = () => {
    const { id } = useParams();
    const [avatar, setAvatar] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const response = await axios.get(
                    'https://appsistemacarcelario.herokuapp.com/api/v1/profile',
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setAvatar(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getAvatar()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>My Profile</h1>
            <hr className='mt-3' />
            {
                Object.keys(avatar).length > 0 ?
                    (
                        <AvatarForm avatar={avatar} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this Profile</p>
                    )
            }
        </div>
    )
}

