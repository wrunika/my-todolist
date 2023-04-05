import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string)=>void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
        setInputValue(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        inputValue.trim() !== '' && props.changeTitle(inputValue.trim());
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
      setInputValue(e.currentTarget.value);
      //inputValue.trim() !== '' && props.changeTitle(inputValue.trim());
        console.log(inputValue)
    }

  return !editMode
      ? <span onDoubleClick={activateEditMode}>{props.title}</span> :
          <TextField sx={{width: '100px'}} variant={'standard'} value={inputValue} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus />
}