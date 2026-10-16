import { useState, useEffect } from 'react';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Fetch from Django API
  const fetchFavorites = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.get('http://localhost:8000/api/favorites/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete from Django API
  const removeFavorite = async (id) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/favorites/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove the deleted movie from the screen instantly
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      alert("Error removing favorite.");
    }
  };

  if (isLoading) return <div className="container"><p>Loading your favorites...</p></div>;

  return (
    <div className="container">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite movies yet. Go explore the Home page!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((fav) => (
            <div key={fav.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} 
                alt={fav.movie_title} 
              />
              <h3>{fav.movie_title}</h3>
              <button 
                className="remove-btn"
                onClick={() => removeFavorite(fav.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;