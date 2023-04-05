import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

export type AddItemFormPropsType = {
    addNewForm: (newTitle: string) => void
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

    return (
        <>
            <div className={'addItemForm'}>
                <TextField
                    variant={'outlined'}
                    size={'small'}
                    value={newTitle}
                    onChange={getInputValue}
                    onKeyDown={onKeyDownHandler}
                    label={'Enter title'}
                    error={error}
                    helperText={error && errorMessage}
                />
                <div>
                    <IconButton onClick={addNewFormHandler} color={'secondary'} size={'small'}>
                        <LibraryAddIcon/>
                    </IconButton>
                </div>
            </div>
        </>
    )
}