// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Landing from './Pages/Landing';
import Cart from './Pages/Cart';
import Menus from './Pages/Menus';
import Menu from './Components/Menu';
import Kitchen from './Pages/Kitchen';
import Footer from './Components/Foot';

function App() {
  return (
    <div className="App d-flex flex-column" style={{minHeight:'100vh'}}>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menus />} />
          <Route path="/kitchen" element={<Kitchen/>} />
        </Routes>
        <Footer />
        
    </div>
  );
}

export default App;