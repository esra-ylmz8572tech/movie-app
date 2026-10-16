import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import { Link } from 'react-router-dom';

function Home() {
  // 1. STATE'LER (Hafıza)
  const [movies, setMovies] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [sortOrder, setSortOrder] = useState(''); 
  const [selectedGenre, setSelectedGenre] = useState(''); 
  const [page, setPage] = useState(1); // Pagination (Sayfalama) state'i eklendi

  // TMDB Kategori ID'leri
  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 878, name: 'Science Fiction' },
    { id: 27, name: 'Horror' }
  ];
  
  // TMDB API Ayarları 
  const API_KEY = "bd5673ab4951fd44b30abac64f282607"; 
  const BASE_URL = "https://api.themoviedb.org/3";

  // 2. VERİ ÇEKME FONKSİYONU (Sayfa numarasını alacak şekilde güncellendi)
  const fetchMovies = async (query = '', pageNum = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      // Eğer arama kelimesi varsa arama API'sine, yoksa popüler filmler API'sine istek at
      const endpoint = query 
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNum}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNum}`;

      const response = await axios.get(endpoint);
      setMovies(response.data.results); 
    } catch (err) {
      setError("An error occurred while fetching movies."); 
    } finally {
      setIsLoading(false); 
    }
  };

  // 3. EFFECT (Sayfa numarası değiştiğinde otomatik olarak veriyi tekrar çeker)
  useEffect(() => {
    fetchMovies(searchQuery, page);
  }, [page]); 

  // 4. ARAMA İŞLEMİ 
  const handleSearch = (e) => {
    e.preventDefault(); 
    setPage(1); // Yeni arama yapıldığında 1. sayfaya geri dön
    fetchMovies(searchQuery, 1);
  };

  // Ekrana çizilmeden önce veriyi filtrele ve sırala
  let displayedMovies = [...movies]; 

  // Kategori seçildiyse filtrele
  if (selectedGenre) {
    displayedMovies = displayedMovies.filter((movie) => 
      movie.genre_ids.includes(parseInt(selectedGenre))
    );
  }

  // Sıralama seçildiyse puana göre sırala (Eksik '-' işaretleri düzeltildi)
  if (sortOrder === 'desc') {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average); // Yüksekten düşüğe
  } else if (sortOrder === 'asc') {
    displayedMovies.sort((a, b) => a.vote_average - b.vote_average); // Düşükten yükseğe
  }

  // 5. EKRANA ÇİZİM 
  return (
    <div className="container">
      <h1>Movie Explorer</h1>
      
      {/* Arama Çubuğu */}
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
   
    {/* Filtreleme ve Sıralama Alanı */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '15px' }}>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">No Sorting</option>
          <option value="desc">Descending by Score</option>
          <option value="asc">Ascending by Score</option>
        </select>
      </div>

      {/* Durum Yönetimi Göstergeleri */}
      {isLoading && <p>Loading... Please wait.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Filmleri Listeleme */}
      <div className="movie-grid">
        {!isLoading && !error && displayedMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
            <h3>{movie.title}</h3>
            <p><strong>Score:</strong> {movie.vote_average}</p>
            <p className="overview">{movie.overview}</p>

            {/* Detay sayfasına giden buton */}
            <Link to={`/movie/${movie.id}`}>
              <button style={{ marginTop: '10px', width: '100%', cursor: 'pointer' }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* YENİ EKLENEN KISIM: Sayfalama (Pagination) Butonları */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0' }}>
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
          style={{ padding: '10px 20px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous Page
        </button>
        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>Page {page}</span>
        <button 
          onClick={() => setPage(page + 1)}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Next Page
        </button>
      </div>

    </div>
  );
}

export default Home;