import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ReportForm = ({ report }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [created, setCreated] = useState([])

    const [form, setForm] = useState({
        title: report?.title ?? "",
        description: report?.description ?? "",
        created_at: report?.created_at ?? "",
        // email: report?.email ?? "",
        // personal_phone: report?.personal_phone ?? "",
        // home_phone: report?.home_phone ?? "",
        // address: report?.address ?? ""
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
            console.log(report)
            if (report?.id) {
                await axios.post(
                    `https://appsistemacarcelario.herokuapp.com/api/v1/report/${report.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `https://appsistemacarcelario.herokuapp.com/api/v1/report/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/reports');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
            <h1 className='text-gray-800 font-bold uppercase text-center text-xl mb-4'>
                {report?.id ? 'Edit' : 'Create'} Report
            </h1>

            {
                error && <p className='text-red-700 font-semibold text-xl'>All fields are required</p>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='title'
                        className='text-gray-700 uppercase font-bold'>Title</label>
                    <input
                        id='title'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='title '
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='text-gray-700 uppercase font-bold'>Description</label>
                    <textarea
                        id='description'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='description'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor='author'
                        className='text-gray-700 uppercase font-bold'>Author</label>
                    <input
                        id='author'
                        type="author"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Author'
                        name='author'
                        value={created.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='status'
                        className='text-gray-700 uppercase font-bold'>State</label>
                        <select 
                        id='email'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        value={form.status}
                        onChange={handleChange}
                        required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                {/* <div>
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
                <div>
                    <label
                        htmlFor='personal_phone'
                        className='text-gray-700 uppercase font-bold'>Phone Number</label>
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
                <div>
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

                <div>
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
                </div> */}

                <input
                    type="submit" className='bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all'
                    value={report?.id ? 'Update' : 'Save'}
                />

            </form>
        </div>
    )
}


