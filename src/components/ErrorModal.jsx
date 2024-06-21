import React, { useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

const ErrorModal = React.forwardRef((props, ref) => {

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open () {
                dialog.current.showModal();
            }
        }
    });

// this is not reusablel. But, we can make it by using the dialog's content as a children prop instead of static content. 
  return createPortal(
    <dialog ref={dialog} className='error-modal'>
      <h2>Invalid Input</h2>
      <p>Please make sure you provide input for every filed.</p>
      <form method='dialog'>
        <button>Okay</button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  )
});

export default  ErrorModal;