// Landing.jsx
import React from 'react';
import Hero from '../Components/Hero'
import { useSelector } from 'react-redux';
import Menus from './Menus';

function Landing() {
  const cartArray = useSelector((state) => state.cartReducer);
  console.log(cartArray);

  return (
    <div>
      <Hero />
      <Menus/>
    </div>
  );
}

export default Landing;





/* const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray); */