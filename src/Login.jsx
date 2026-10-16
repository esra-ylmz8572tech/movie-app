import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // İstek login adresine gidiyor
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      });
      // Backend'den gelen güvenli JWT erişim anahtarını sakla
      localStorage.setItem('access_token', response.data.access);
      alert('Giriş başarılı!');
      navigate('/'); // Giriş yapınca ana sayfaya yönlendir
    } catch (error) {
      alert('Giriş başarısız! Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Kullanıcı Adı" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Şifre" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" style={{ cursor: 'pointer', backgroundColor: '#e50914', color: 'white' }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;