import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './Compents/Header';
import Hero from './Compents/Hero';
import Menu from './Compents/Menu';
import Landing from './Pages/Landing';
import Cart from './Pages/Cart';
import Menus from './Pages/Menus';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menus />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
