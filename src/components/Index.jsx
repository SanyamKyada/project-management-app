import React from 'react'
import Button from './Button'

export default function Index({onInitCreate}) {
  return (
    <div className='index'>
      <img className="applogo" src='public/logo.png' alt='app-logo' />
        <h1>No Project Selected</h1>
        <h2>Select a project or get started with a new one</h2>
        <Button onClick={onInitCreate}>Create new project</Button>
    </div>
  )
}
