import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AvatarForm = ({ avatar }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({

        image: avatar?.image ?? ""
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes("")) {
            console.log("error");
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
            return;
        }

        try {
            console.log(avatar)
                await axios.put(
                    'https://appsistemacarcelario.herokuapp.com/api/v1/profile',
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            navigate('/profile');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div class='md:grid md:grid-cols-3 md:gap-6'>
             <div class="md:col-span-1">
               <div class="px-4 sm:px-0">
                   <h3 class="text-lg font-medium text-gray-900">
                      Avatar
                    </h3>
                      <p class="mt-1 text-sm text-gray-600">         
                      Update your profile avatar.
                    </p>
               </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow-md overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                    <form onSubmit={handleSubmit}>
                    <div class="col-span-6 sm:col-span-2">
                <img src={form.avatar} class="w-24 h-24 md:w-28 md:h-28 mx-auto" alt="" />
            </div>
            <div class="col-span-6 sm:col-span-4">
                <label class="block ml-3 font-bold text-sm text-gray-700 tracking-wide" for="image"/>

                <input id="image"
                         class="rounded-2xl text-base px-4 py-2 border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-500  disabled:opacity-50"
                         type="file"
                         name="image"
                         required/>
            </div>
            <div class="col-span-6 flex justify-end">
                <button class="inline-flex justify-center p-2 bg-gradient-to-r from-blue-500 to-green-500  rounded-full font-semibold text-base text-white tracking-widest hover:from-$primaryColor-600 hover:to-$secondaryColor-600 focus:outline-none focus:border-$primaryColor-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">Update</button>
            </div>
            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


