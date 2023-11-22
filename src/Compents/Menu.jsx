import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Menu() {
  const [tableNumber, setTableNumber] = useState('Select the table');
  const [menuItems, setMenuItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(12);
  const [itemQuantities, setItemQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get('https://r2-backend.onrender.com/menu')
      .then(response => {
        // Set the fetched data to the state
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const handleViewMore = () => {
    // Increment the number of displayed items when the "View More" button is clicked
    setDisplayedItems(prev => prev + 10);
  };

  const handleAddToCart = (itemId, quantity) => {
    // Update the quantity for the selected item
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));

    // Add the selected item to the list of selected items
    const selectedItem = menuItems.find(item => item.id === itemId);
    setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedItem]);
  };

  const handleIncrementQuantity = (itemId) => {
    // Increment the quantity for the selected item
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrementQuantity = (itemId) => {
    // Decrement the quantity for the selected item, ensuring it does not go below 0
    const newQuantity = Math.max((itemQuantities[itemId] || 0) - 1, 0);

    if (newQuantity === 0) {
      // Remove the item from the list of selected items if the new quantity is zero
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.filter(item => item.id !== itemId)
      );
    }

    // Update the quantity for the selected item
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  console.log(selectedItems);

  return (
    <Container>
      <div style={{ marginTop: '5%' }}>
        <h1 className='text-dark'>Menu</h1>
      </div>
      <Row className='w-25 d-flex ms-auto'>
        <Form.Select
          aria-label="Default select example"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        >
          <option>Select the table</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Row>
      <Row className='menu-items mt-5 justify-content-center'>
  {menuItems.slice(0, displayedItems).map(item => (
    <Col key={item.id} xs={12} md={6} lg={3} className="mb-4">
      <Card style={{ width: '100%' }} className="d-flex flex-column h-100">
        <Card.Img variant="top" src={item.img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.dsc}</Card.Text>
          <span className='mb-2'>Price: ${item.price}</span>
          <div className="d-flex justify-content-center align-items-center mt-auto">
            {itemQuantities[item.id] ? (
              <div className="d-flex align-items-center">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleDecrementQuantity(item.id)}
                  className="mx-2"
                >
                  -
                </Button>
                <span>{itemQuantities[item.id]}</span>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleIncrementQuantity(item.id)}
                  className="mx-2"
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                variant="dark"
                onClick={() => handleAddToCart(item.id, 1)}
              >
                Add to cart
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
      {displayedItems < menuItems.length && (
        <Row className="justify-content-center mt-3">
          <Button className='w-50 mb-5' variant="dark" onClick={handleViewMore}>
            View More
          </Button>
        </Row>
      )}

      {/* Display selected items */}
      {selectedItems.length > 0 && (
      <div className="selected-items-container rounded-5 w-25">
        <h2>Cart</h2>
        <ul>
          {selectedItems.map(selectedItem => (
            <li key={selectedItem.id}>
              {selectedItem.name} - Quantity: {itemQuantities[selectedItem.id]}
            </li>
          ))}
        </ul>
      </div>
    )}
    </Container>
  );
}

export default Menu;