import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileForm } from '../../components/organisms/ProfileForm';

export const UpdateProfileInformation = () => {
    const [profile, setProfile] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(
                    'https://appsistemacarcelario.herokuapp.com/api/v1/profile',
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                console.log(response)
                const user = { ...response.data.data.avatar }
                setProfile(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [])

    return (
        <div>
            <hr className='mt-3' />
            {
                Object.keys(profile).length > 0 ?
                    (
                        <ProfileForm profile={profile} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this Profile</p>
                    )
            }
        </div>
    )
}


