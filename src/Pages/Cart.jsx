// Cart.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Cart() {
  //useselector hook to access state 
  const cartArray = useSelector((state) => state.cartReducer);
  console.log(cartArray);

  //useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  const [total,setTotal] = useState(0)

  const navigate = useNavigate()

  //fn to get total price
  const totalPrice = ()=>{
    if(cartArray?.length>0){
      setTotal(cartArray.map((item)=>item.total_price).reduce((p1,p2)=>p1+p2))
    }
  }
  console.log(total);

  //totalPrice fn will be called on page load and also when state changes
  useEffect(()=>{
    totalPrice()
  },[cartArray])


  const addToOrder = async(order)=>{
    if(cartArray.length === 0) {
      alert('Cart is empty. Please add items to cart before placing an order.');
      return;
    }
    await axios({
      method: 'post',
      url: 'https://r2-backend.onrender.com/order',
      data: order
    });
    alert('Order Placed')
    //fn to empty cartArray after checkout
    dispatch(emptyCart())
    console.log(cartArray);
    navigate('/menu')
  }

  return (
    <div style={{ width:'100%',marginTop: '100px', height:'73vh'}}>
      <div className='row'>
        {cartArray?.length > 0 ?
          <div className='col-lg-6 m-5'>
            <table className='table shadow border'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  {/* <th>Image</th> */}
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Table Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartArray?.map((item, index) => (<tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  {/* <td><img style={{ height: '100px', width: '100px' }} src={item.img} alt="no image" /></td> */}
                  <td>₹ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.price * item.quantity}</td>
                  <th>{item.table_no}</th>
                  <td><Button variant="outline-danger" onClick={()=>dispatch(removeFromCart(item.id))}><i class="fa-solid fa-trash"></i></Button></td>
                </tr>

                ))
                }
              </tbody>
            </table>
          </div>
          :
          <center>
            <div className='w-50'>
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/0845c232253239.56766f2d063c9.gif" style={{width:'50%'}} alt="" />
              <h4 style={{color:'gray'}} >Waiting for New Orders</h4>
            </div>
          </center>
        }
        {cartArray.length > 0 && (
          <div className='col-lg-4 card shadow border p-5 ms-auto' style={{marginRight:'10%'}}>
            <h1 className='text-center text-dark'>Cart Summary</h1>
            <p className='fs-3 fw-medium mt-4'>Total items in cart: <span style={{}}>{cartArray.length}</span> </p>
            {/* <p className='fs-3 fw-medium'>Total price: {total} </p> */}
            <p className='fs-3 fw-medium'>Total price: ₹ <span style={{color:'orange'}}>{total}</span> </p>
            <button className='btn btn-success w-100 rounded' onClick={()=>addToOrder(cartArray)}>Checkout & Pay</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
