import { useEffect, useState } from 'react';
import axios from 'axios';

function ShowRGB() {
    console.log("display rgb")
    const [rgbValues, setRgbValues] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/getRGB")
            .then((response) => {
                setRgbValues(response.data.rgb_values);
                console.log(data.rgb_values)
            })
            .catch((error) => {
                console.error("Gagal mendapatkan data RGB:", error);
            });
    }, []);

    return (
        <div className='px-6 pt-6 border-2 border-black w-[20vw] h-[87vh] overflow-auto'>
            <h1 className='font-bold mb-4'>Nilai RGB per Pixel</h1>
            <table className='table-fixed border-collapse border w-full'>
                <thead>
                    <tr>
                        <th className='border border-slate-700 w-[33%] bg-red-400'>Red</th>
                        <th className='border border-slate-700 w-[33%] bg-green-400'>Green</th>
                        <th className='border border-slate-700 w-[33%] bg-blue-400'>Blue</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {rgbValues.map((pixel, index) => (
                        <tr key={index}>
                            <td className='border border-slate-700 text-center'>{pixel.red}</td>
                            <td className='border border-slate-700 text-center'>{pixel.green}</td>
                            <td className='border border-slate-700 text-center'>{pixel.blue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowRGB;