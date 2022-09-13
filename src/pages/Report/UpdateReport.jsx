import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReportForm } from '../../components/organisms/ReportForm';

export const UpdateReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `https://appsistemacarcelario.herokuapp.com/api/v1/report/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setReport(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getReport()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Report</h1>
            <hr className='mt-3' />
            {
                Object.keys(report).length > 0 ?
                    (
                        <ReportForm report={report} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this report</p>
                    )
            }
        </div>
    )
}


