import { useState, useEffect } from "react";
import axios from "axios";
import "./TareaList.css"; // Estilos

const TareaList = () => {
  const [tareas, setTareas] = useState([]); // Lista de tareas
  const [modoEdicion, setModoEdicion] = useState(false); // Controla si estamos editando una tarea
  const [tareaEditable, setTareaEditable] = useState(null); // Tarea en edición
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
    fechaLimite: "",
  });

  // Obtener tareas al cargar el componente
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/tareas");
        setTareas(respuesta.data);
      } catch (error) {
        alert("Error al obtener tareas: " + error.message);
      }
    };
    fetchTareas();
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({ ...nuevaTarea, [name]: value });
  };

  // Crear una nueva tarea
  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post("http://localhost:3000/api/tareas", nuevaTarea);
      setTareas([respuesta.data, ...tareas]);
      setNuevaTarea({ titulo: "", descripcion: "", estado: "Pendiente", fechaLimite: "" });
    } catch (error) {
      alert("Error al crear tarea: " + error.message);
    }
  };

  // Eliminar una tarea
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tareas/${id}`);
      setTareas(tareas.filter((t) => t._id !== id));
    } catch (error) {
      alert("Error al eliminar tarea: " + error.message);
    }
  };

  // Preparar edición de tarea
  const iniciarEdicion = (tarea) => {
    setModoEdicion(true);
    setTareaEditable(tarea);
  };

  // Editar tarea
  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.put(`http://localhost:3000/api/tareas/${tareaEditable._id}`, tareaEditable);
      setTareas(tareas.map((t) => (t._id === tareaEditable._id ? respuesta.data : t)));
      setModoEdicion(false);
      setTareaEditable(null);
    } catch (error) {
      alert("Error al editar tarea: " + error.message);
    }
  };

  // Formatear fecha límite
  const formatearFecha = (fecha) => {
    return new Date(fecha).toISOString().split("T")[0];
  };

  return (
    <div className="tarea-list">
      <h1>Gestión de Tareas</h1>
      {!modoEdicion ? (
        <form onSubmit={handleCrear} className="formulario">
          <h2>Crear Tarea</h2>
          <input
            type="text"
            name="titulo"
            value={nuevaTarea.titulo}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <textarea
            name="descripcion"
            value={nuevaTarea.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <select name="estado" value={nuevaTarea.estado} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
          <input
            type="date"
            name="fechaLimite"
            value={nuevaTarea.fechaLimite}
            onChange={handleChange}
            required
          />
          <button type="submit">Crear Tarea</button>
        </form>
      ) : (
        <form onSubmit={handleEditar} className="formulario">
          <h2>Editar Tarea</h2>
          <input
            type="text"
            name="titulo"
            value={tareaEditable.titulo}
            onChange={(e) => setTareaEditable({ ...tareaEditable, titulo: e.target.value })}
            required
          />
          <textarea
            name="descripcion"
            value={tareaEditable.descripcion}
            onChange={(e) => setTareaEditable({ ...tareaEditable, descripcion: e.target.value })}
            required
          />
          <select
            name="estado"
            value={tareaEditable.estado}
            onChange={(e) => setTareaEditable({ ...tareaEditable, estado: e.target.value })}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
          <input
            type="date"
            name="fechaLimite"
            value={formatearFecha(tareaEditable.fechaLimite)}
            onChange={(e) => setTareaEditable({ ...tareaEditable, fechaLimite: e.target.value })}
            required
          />
          <button type="submit">Guardar Cambios</button>
        </form>
      )}

      <h2>Lista de Tareas</h2>
      <ul className="lista-tareas">
        {tareas.map((t) => (
          <li key={t._id} className="tarea">
            <h3>{t.titulo}</h3>
            <p>{t.descripcion}</p>
            <span className={`estado ${t.estado.toLowerCase().replace(" ", "-")}`}>{t.estado}</span>
            <p>Fecha Límite: {formatearFecha(t.fechaLimite)}</p>
            <button onClick={() => iniciarEdicion(t)}>Editar</button>
            <button onClick={() => handleDelete(t._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TareaList;
