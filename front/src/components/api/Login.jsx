import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes añadir lógica para autenticación.
    console.log('Inicio de sesión:', { email, password });
    navigate('/tareas');
  };

  return (
    <div className="login-container">
     <div className='login'>
     <h2 className='testoCentrado'>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="correo@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="•••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
      <p className='login-bottom'>
        ¿No tienes cuenta?{' '}
        <a href="/register">Registrate</a>
      </p>
     </div>
    </div>
  );
}

export default Login;
