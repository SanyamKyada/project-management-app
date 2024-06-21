import React from 'react'
import Button from './Button'

export default function ProjectTasks({ tasks , onClearTask}) {
    return (
        <div className='tasks my-15'>
            {tasks.map((task, index) => (
                <div key={index} className='flex-space-btw my-15'>
                    <p>{task}</p>
                    <Button onClick={() => onClearTask(index)}>Clear</Button>
                </div>
            ))}
        </div>
    )
}
