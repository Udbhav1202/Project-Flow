import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<Tasks />} />
    </Routes>
  );
}

export default App;