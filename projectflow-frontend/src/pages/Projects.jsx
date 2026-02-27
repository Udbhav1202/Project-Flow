import { useEffect, useState } from "react";
import api from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      alert("Failed to load projects");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchProjects(); // refresh list
    } catch (err) {
      alert("Failed to create project");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>My Projects</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />
        <button type="submit">Create Project</button>
      </form>

      <hr />

      {projects.map((project) => (
        <div key={project._id}>
            <p
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => window.location.href = `/projects/${project._id}`}
            >
                <b>{project.title}</b>
            </p>
        </div>
        ))}
    </div>
  );
}

export default Projects;