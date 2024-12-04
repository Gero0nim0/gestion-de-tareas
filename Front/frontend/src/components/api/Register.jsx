import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Aquí puedes añadir lógica para registro.
    console.log('Registro:', { username, email, password });
    alert('Cuenta creada exitosamente');
    navigate('/');
  };

  return (
    <div className="register-container">
      <div>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
      <p className='login-bottom'>
        ¿Ya tienes cuenta?{' '}
        <a href="/login">Iniciar sesion</a>
      </p>
      </div>
    </div>
  );
}

export default Register;

