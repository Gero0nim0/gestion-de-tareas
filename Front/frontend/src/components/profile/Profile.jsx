import { useState, useEffect } from 'react';
import { useAuth } from '../Api/AuthContext'; // Contexto de autenticación
import api from '../Api/Url'; // Cliente para llamadas al backend

const Profile = () => {
  const [userData, setUserData] = useState({ username: "", id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth(); // Contexto de autenticación

  useEffect(() => {
    if (!isAuthenticated) return; // Evitar la ejecución si no está autenticado

    const fetchUserData = async () => {
      try {
        const response = await api.get('/users');
        setUserData({
          username: response.data.username || "",
          id: response.data.id || null,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]); // Escuchar cambios en isAuthenticated

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userData.username.trim()) {
      alert('El nombre de usuario no puede estar vacío.');
      return;
    }

    try {
      const response = await api.put(`/users/${userData.id}`, {
        username: userData.username,
      });
      console.log('Datos actualizados:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!isAuthenticated) {
    return <p>No tienes acceso. Inicia sesión primero.</p>;
  }

  return (
    <div>
      <h1>Bienvenido a tu perfil</h1>
      <div className="perfil-container">
        <h2>Perfil de {userData.username}</h2>
        <div className="perfil-info">
          <label>
            <strong>Nombre:</strong>
            {isEditing ? (
              <input
                type="text"
                value={userData.username || ""}
                name="username"
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.username}</p>
            )}
          </label>

          {isEditing ? (
            <button onClick={handleSave} className="save-button">
              Guardar
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
