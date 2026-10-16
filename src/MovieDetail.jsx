import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams(); // Get ID from URL
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // PASTE YOUR API KEY HERE
  const API_KEY = "bd5673ab4951fd44b30abac64f282607"; 
  const BASE_URL = "https://api.themoviedb.org/3";

  // 1. Fetch Movie Details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (err) {
        setError("An error occurred while fetching movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // 2. Add to Favorites Logic (localStorage)
// 2. Gerçek Veritabanına Favori Ekleme İşlemi (Django API)
  const addToFavorites = async () => {
    // Kullanıcının giriş yapıp yapmadığını token üzerinden kontrol et
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert("Favorilere film eklemek için önce giriş yapmalısınız!");
      return;
    }

    try {
      // Backend'deki favoriler uç noktasına istek atıyoruz
      await axios.post(
        'http://localhost:8000/api/favorites/',
        {
          movie_id: movie.id,
          movie_title: movie.title,
          poster_path: movie.poster_path
        },
        {
          // Kimlik doğrulama için JWT anahtarımızı gönderiyoruz
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(`${movie.title} başarıyla hesabınıza kaydedildi!`);
    } catch (error) {
      alert("Bu film zaten favorilerinizde veya bir hata oluştu.");
    }
  };

  // Loading and Error States
  if (isLoading) return <div className="container"><p>Loading movie details...</p></div>;
  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!movie) return null;

  // 3. Render UI
  return (
    <div className="container">
      <Link to="/">
        <button style={{ marginBottom: '20px', cursor: 'pointer' }}>Back to Home</button>
      </Link>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          style={{ borderRadius: '10px', maxWidth: '300px' }}
        />
        <div style={{ maxWidth: '600px' }}>
          <h2>{movie.title}</h2>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p>{movie.overview}</p>
          
          {/* Add to Favorites Button */}
          <button 
            onClick={addToFavorites} 
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#e50914', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;