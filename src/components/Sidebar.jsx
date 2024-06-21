import React from 'react'
import Button from './Button'

export default function Sidebar({ onInitCreate, projects, onViewProject }) {
  return (
    <div className='sidebar'>

      <h1 className='text-white'>Your Projects</h1>
      
      <Button className='' onClick={onInitCreate}>+ Add Project</Button>

      {projects && projects.map((project, index) => (
        <div key={index} onClick={() => onViewProject(project.projectId)} className='project-title'>{project.title}</div>
      ))}

    </div>
  )
}
