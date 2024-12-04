import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TareaList from "./components/api/TareaList";
import Login from "./components/api/Login";
import Register from "./components/api/Register";

const App = () => {
  return (
    <Router>
    <div className="app">
      {/* Contenido principal */}
      {/*a*/}
      <div className="content">
        <Routes>
          {/* Redirige al Login al acceder a la página principal */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tareas" element={<TareaList />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
};

export default App;



