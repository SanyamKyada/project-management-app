import { useRef, useState } from "react";
import Index from "./components/Index";
import Sidebar from "./components/Sidebar";
import AddProject from "./components/AddProject";
import Project from "./components/Project";

function App() {

  const [isViewNewProject, setIsViewNewProject] = useState(false);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const initCreateProject = () => {
    setIsCreatingNewProject(true);
    setIsViewNewProject(false);
  }

  const cancleCreateProject = () => {
    setIsCreatingNewProject(false);
  }

  const createProject = (formData) => {
    setProjects(prevProjects => {
      return [
        ...prevProjects,
        { projectId: prevProjects.length + 1, ...formData }
      ]
    });
    setIsCreatingNewProject(prevValue => !prevValue);
  }

  const onViewProject = (id) => {
    const i = projects.findIndex(x => x.projectId == id);
    if (i !== -1) {
      setSelectedProject(projects[i]);
    }

    setIsViewNewProject(true);
    setIsCreatingNewProject(false);
  }

  const addTask = (id, task) => {
    const i = projects.findIndex(x => x.projectId == id);
    if (i !== -1) {
      // Create a copy of the projects array
      const updatedProjects = [...projects];

      // Create a copy of the object at the found index
      const updatedProject = { ...updatedProjects[i] };

      // Update the tasks array of the object by adding the new task
      updatedProject.tasks = [...updatedProject.tasks, task];

      // Update the copied data array with the modified object
      updatedProjects[i] = updatedProject;

      // Update the state with the modified projects array
      setProjects(updatedProjects);
      setSelectedProject(updatedProject);
    }
  }

  const deleteProject = (id) => {
    const updatedProjects = projects.filter(obj => obj.projectId !== id);
    setProjects(updatedProjects);
    setSelectedProject(null);
    setIsCreatingNewProject(false);
    setIsViewNewProject(false);
  }

  const deleteTask = (projectId, taskIndex) => {
    const updatedProjects = [...projects];
    const projIndex = projects.findIndex(x => x.projectId == projectId);
    if(projIndex != -1){
      const updatedProject = updatedProjects[projIndex];
      updatedProject.tasks.splice(taskIndex, 1);
      updatedProjects[projIndex] = updatedProject;
      setProjects(updatedProjects);
      setSelectedProject(updatedProject);
    }
  }

  return (
    <>
      <Sidebar onInitCreate={initCreateProject} onViewProject={onViewProject} projects={projects} />
      <div className="landing-home">
        {(!isCreatingNewProject && !isViewNewProject) && <Index onInitCreate={initCreateProject} />}
        {isCreatingNewProject && <AddProject onCreate={createProject} onCancel={cancleCreateProject}/>}
        {isViewNewProject && <Project project={selectedProject} addNewTask={addTask} onDeleteProject={deleteProject} onDeleteTask={deleteTask}/>}
      </div>
    </>
  );
}

export default App;
