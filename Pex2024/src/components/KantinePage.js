import React, { useState, useEffect } from 'react';
import '../kantineStyles.css'; // Import the CSS file

function KantinePage() {
  const [matData, setMatData] = useState([]);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/mat')
      .then(response => response.json())
      .then(data => {
        // Ensure all items have more than 10 units available
       const updatedData = data.map(item => ({
          ...item,
          tilgjengelighet: item.tilgjengelighet > 10 ? item.tilgjengelighet : 11
        }));
        setMatData(updatedData);
      })
      .catch(error => console.error('Error fetching mat data:', error));
  }, []);

  const addToCart = (item) => {
    if (item.tilgjengelighet > 0) {
      setCart(prev => {
        const quantity = prev[item.matID] ? prev[item.matID].quantity + 1 : 1;
        return {
          ...prev,
          [item.matID]: {
            ...item,
            quantity
          }
        };
      });
      // Reduce the available stock by 1
      setMatData(prev => prev.map(mat => 
        mat.matID === item.matID ? { ...mat, tilgjengelighet: mat.tilgjengelighet - 1 } : mat
      ));
    }
  };

  const removeFromCart = (itemID) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemID].quantity > 1) {
        newCart[itemID].quantity -= 1;
      } else {
        delete newCart[itemID];
      }
      return newCart;
    });
  };

  const toggleCart = () => {
    setShowCart(prev => !prev);
  };

  const handleOrder = async () => {
    const userId = 1; // This should be set dynamically based on the logged-in user
    const items = Object.keys(cart).map(key => ({
      matID: parseInt(key),
      quantity: cart[key].quantity
    }));

    try {
      const response = await fetch('http://localhost:3001/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, items })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Thank you for your order! Your order number is ${data.orderId}. Total Cost was: ${data.totalCost} kr.`);
      } else {
        console.error('Order placement failed');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container">
      <h1>Kantine</h1>
      <div className="cards">
        {matData.map(mat => (
          <div className="card" key={mat.matID}>
            <h2>{mat.navn}</h2>
            <p className="price">{mat.pris} kr</p>
            {mat.tilgjengelighet > 10 ? (
              <p className="stock-status" style={{ color: 'green' }}>On Stock</p>
            ) : mat.tilgjengelighet > 0 ? (
              <p className="stock-status" style={{ color: 'yellow' }}>Low on Stock</p>
            ) : (
              <p className="stock-status" style={{ color: 'red' }}>Empty</p>
            )}
            {mat.tilgjengelighet > 0 ? (
              <button onClick={() => addToCart(mat)}>Add to Cart</button>
            ) : (
              <button disabled>Empty</button>
            )}
          </div>
        ))}
      </div>
      <button onClick={toggleCart} className="toggle-cart">Toggle Cart</button>
      {showCart && (
        <div className="cart-details">
          <h2>Shopping Cart</h2>
          <ul>
            {Object.keys(cart).map(key => (
              <li key={key}>
                {cart[key].navn}: {cart[key].quantity} x {cart[key].pris} kr
                <button onClick={() => removeFromCart(key)}>Remove One</button>
              </li>
            ))}
          </ul>
          <div>Total Cost: {totalPrice} kr</div>
          <button onClick={handleOrder} className="order-button">Order</button>
        </div>
      )}
    </div>
  );
}

export default KantinePage;
