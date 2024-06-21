import React, { useRef } from 'react'
import ProjectTasks from './ProjectTasks'
import Button from './Button';

export default function Project({ project, addNewTask, onDeleteProject, onDeleteTask }) {

  const taskInpRef = useRef();

  const addTask = () => {
    const newTask = taskInpRef.current.value;
    addNewTask(project.projectId, newTask);
    taskInpRef.current.value = '';
  }

  const clearTask = (taskIndex) => {
    onDeleteTask(project.projectId, taskIndex);
  }

  return (
    <div className='project'>

      <div className='flex-space-btw'>
        <h1>{project.title}</h1>
        <Button onClick={() => onDeleteProject(project.projectId)}>Delete</Button>
      </div>
      <h2 className=''>{project.duedate}</h2>
      <p className='my-15'>{project.description}</p>

      <hr className='my-30'></hr>

      <h1 className='my-15'>Tasks</h1>
      <input ref={taskInpRef} className='my-15' type='text' />
      <Button onClick={addTask} className='my-15 mx-10'>Add Task</Button>
      {project.tasks.length > 0
        ? <ProjectTasks tasks={project.tasks} onClearTask={clearTask}/>
        : <p className='my-15'>This project does not have any tasks yet.</p>}
    </div>
  )
}
