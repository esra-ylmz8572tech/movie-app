import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username,
        password
      });
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
      navigate('/login'); // Kayıt olunca giriş sayfasına yönlendir
    } catch (error) {
      alert('Kayıt olurken bir hata oluştu. Kullanıcı adı alınmış olabilir.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
        <button type="submit" style={{ cursor: 'pointer' }}>Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;