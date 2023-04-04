import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addNewForm: (newTitle: string)=>void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState(false);
    const errorMessage = 'Title is required';

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTitle(e.currentTarget.value)
    }
    const addNewFormHandler = () => {
        newTitle.trim() === '' ? setError(true) : props.addNewForm(newTitle.trim());
        setNewTitle('');
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addNewFormHandler();
    }

  return(
      <div>
          <input className={error ? 'error' : ''} value={newTitle} onChange={getInputValue} onKeyDown={onKeyDownHandler} />
          <button onClick={addNewFormHandler}>+</button>
          {error && <p className={'errorMessage'}>{errorMessage}</p>}
      </div>
  )
}