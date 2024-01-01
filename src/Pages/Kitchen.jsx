import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

function Kitchen() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://r2-backend.onrender.com/order');   
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Flatten the data into a single array of objects
    const flattenedData = data.flat();

    // Group the data by table_no
    const groupedData = flattenedData.reduce((acc, item) => {
        (acc[item.table_no] = acc[item.table_no] || []).push(item);
        return acc;
    }, {});

    console.log(flattenedData);

    const handleOrderCompleted = async (tableNumber) => {
        try {
            await axios.delete(`https://r2-backend.onrender.com/order/${tableNumber}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            {Object.entries(groupedData).length === 0 ? (
                <div className='card p-5 d-flex mt-5 justify-content-center align-items-center mb-5'>
                    <img src="https://cdn.dribbble.com/users/1834025/screenshots/16497193/media/9f31f985466dc439c3714233cc598747.gif" alt=""  style={{width:'30%'}}/>
                    <h1 className='text-secondary'>Nothing to prepare</h1>
                </div>
            ) : (
                Object.entries(groupedData).map(([tableNumber, items]) => (
                    <div className='card p-5 d-flex my-5' key={tableNumber}>
                        <h1>Table Number: {tableNumber}</h1>
                        <div className="d-flex flex-wrap gap-5">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="card mb-4 rounded shadow-sm p-3" // Add padding to the card
                                    style={{ width: '250px' }} // Set a fixed width for each card
                                >
                                    <div className="d-flex justify-content-center">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="card-img-top rounded"
                                            style={{ width: '100%', height: '100%' }} // Set a fixed size for the image
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">{item.name}</h3>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Badge className=' w-100' style={{ fontSize: '1rem' }} bg="dark">X {item.quantity}</Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="success" className='ms-auto' onClick={() => handleOrderCompleted(tableNumber)}>Order Completed</Button>
                    </div>
                ))
            )}
        </Container>
    );
}

export default Kitchen;