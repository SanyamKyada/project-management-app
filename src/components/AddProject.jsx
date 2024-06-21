import React, { useRef, useState } from 'react'
import Button from './Button';
import ErrorModal from './ErrorModal';

export default function AddProject ( {onCreate, onCancel}) {

    const titleRef = useRef();
    const descRef = useRef();
    const dueDateRef = useRef();
    const dialog = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    const validateInputs = () => {
        const inputs = [
            { ref: titleRef, fieldName: 'title' },
            { ref: descRef, fieldName: 'description' },
            { ref: dueDateRef, fieldName: 'due date' }
        ];

        let isError = false;

        inputs.forEach(({ ref, fieldName }) => {
            const value = ref.current.value.trim();
            if (value === '') {
                ref.current.classList.add('error');
                isError = true;
            } else {
                ref.current.classList.remove('error');
            }
        });

        if (isError) {
            setErrorMessage('Please fill in all required fields.');
            dialog.current.open();
        }
        else{
            setErrorMessage('');
            onCreate({
                title: titleRef.current.value,
                description: descRef.current.value,
                duedate: dueDateRef.current.value,
                tasks: []
            });
        }
    }

    return (
        <>
        <ErrorModal ref={dialog} />
        <div className='add-new-form'>
            <div className='actions' >
                <Button className='cancel' onClick={onCancel}>Cancel</Button>
                <Button className='save' onClick={validateInputs}>Save</Button>
            </div>
            <div className='form-group' >
                <label htmlFor='title'>Title</label>
                <input ref={titleRef} name='title' type='text' />
            </div>
            <div className='form-group' >
                <label htmlFor='description'>Description</label>
                <textarea ref={descRef} name='description' type='text' />
            </div>
            <div className='form-group' >
                <label htmlFor='due-date'>Due Date</label>
                <input ref={dueDateRef} name='due-date' type='date' />
            </div>
        </div>
        <div style={{'color':'red','marginLeft':'50px'}}>{errorMessage}</div>
        </>
    )
};
