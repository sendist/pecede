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
        <div className='px-8 border-2'>
            <h1>Nilai RGB per Pixel</h1>
            <table className='border-2 overflow-auto'>
                <thead>
                    <tr>
                        <th>Red</th>
                        <th>Green</th>
                        <th>Blue</th>
                    </tr>
                </thead>
                <tbody className='border-2'>
                    {rgbValues.map((pixel, index) => (
                        <tr key={index}>
                            <td>{pixel.red}</td>
                            <td>{pixel.green}</td>
                            <td>{pixel.blue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowRGB;