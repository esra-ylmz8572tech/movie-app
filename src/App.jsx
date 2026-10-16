import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import MovieDetail from './MovieDetail';
import Register from './Register';
import Login from './Login';
import Favorites from './Favorites';
import './App.css';

function App() {
  return (
    <>
      <Navbar /> {/* Navbar applies to all pages */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;