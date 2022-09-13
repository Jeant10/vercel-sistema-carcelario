import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export const ProfileForm = ({ profile }) => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: profile?.username ?? "",
        first_name: profile?.first_name ?? "",
        last_name: profile?.last_name ?? "",
        email: profile?.email ?? "",
        birthdate: profile?.birthdate ?? "",
        home_phone: profile?.home_phone ?? "",
        personal_phone: profile?.personal_phone ?? "",
        address: profile?.address ?? ""
    });

    const token = localStorage.getItem('token');
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
        axios.post(`https://appsistemacarcelario.herokuapp.com/api/v1/profile`, {...form},{ headers: {'Accept': 'application/json', 'Authorization': token }})
            navigate('/login');
        }catch(error){
            console.error(error);
        }
        
   }
    return (
        <div className='md:grid md:grid-cols-3 md:gap-6'>
           <div class="md:col-span-1">
               <div className="px-4 sm:px-0">
                   <h3 className="text-lg font-medium text-gray-900">
                      Profile
                    </h3>
                      <p className="mt-1 text-sm text-gray-600">         
                      Update your account's profile information.
                      </p>
               </div>
            </div>
            
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow-md overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                    <form onSubmit={handleSubmit}>
                <div class="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='first_name'
                        className='text-gray-700 uppercase font-bold'>First Name</label>
                    <input
                        id='first_name'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='First Name'
                        name='first_name'
                        value={form.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='last_name'
                        className='text-gray-700 uppercase font-bold'>Last Name</label>
                    <input
                        id='last_name'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Last Name'
                        name='last_name'
                        value={form.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='username'
                        className='text-gray-700 uppercase font-bold'>Username</label>
                    <input
                        id='username'
                        type="username"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Username'
                        name='username'
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='email'
                        className='text-gray-700 uppercase font-bold'>Email</label>
                    <input
                        id='email'
                        type="email"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='personal_phone'
                        className='text-gray-700 uppercase font-bold'>Birthdate</label>
                    <input
                        id='birthdate'
                        type="bir"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='birthdate'
                        placeholder='Phone Number'
                        value={form.birthdate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='personal_phone'
                        className='text-gray-700 uppercase font-bold'>Personal Phone</label>
                    <input
                        id='personal_phone'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='personal_phone'
                        placeholder='Phone Number'
                        value={form.personal_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='home_phone'
                        className='text-gray-700 uppercase font-bold'>Home Number</label>
                    <input
                        id='home_phone'
                        type="tel"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        name='home_phone'
                        placeholder='Home Number'
                        value={form.home_phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label
                        htmlFor='address'
                        className='text-gray-700 uppercase font-bold'>Address</label>
                    <textarea
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Address'
                        name='address'
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div>

            <div class="col-span-6 flex justify-end">
            <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={'Save'}
                />            </div>
            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


