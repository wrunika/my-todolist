import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


type TodolistPropsType = {
    tListId: string
    title: string
    tasks: Array<TaskType>
    filterValue: FilterValueType
    removeTask: (tListId: string, taskId: string) => void
    changeFilter: (tListId: string, filter: FilterValueType) => void
    addTask: (tListId: string, newTaskTitle: string) => void
    changeStatus: (tListId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (tListId: string) => void
    changeTodolistTitle: (tListId: string, newTitle: string) => void
    changeTaskTitle: (tListId: string, taskId: string, newTitle: string) => void
}
export const Todolist = (props: TodolistPropsType) => {


    const allButtonStyle = props.filterValue === 'All' ? 'secondary' : 'primary';
    const activeButtonStyle = props.filterValue === 'Active' ? 'secondary' : 'primary';
    const completedButtonStyle = props.filterValue === 'Completed' ? 'secondary' : 'primary';
    const onAllClickHandler = () => props.changeFilter(props.tListId, 'All');
    const onActiveClickHandler = () => props.changeFilter(props.tListId, 'Active');
    const onCompletedClickHandler = () => props.changeFilter(props.tListId, 'Completed');


    const removeTodolistHandler = () => {
        props.removeTodolist(props.tListId);
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.tListId, newTitle)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.tListId, newTitle);
    }


    return (
        <div>
            <h3 className={'tlTitle'}>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            </h3>
            <Button variant="contained" endIcon={<DeleteOutlineIcon />} size={'small'} onClick={removeTodolistHandler}>
                Delete
            </Button>

            <AddItemForm addNewForm={addTaskHandler}/>

            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.tListId, t.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.tListId, t.id, e.currentTarget.checked)
                    }
                    const onChangeTaskTitle = (newTitle: string) => {
                      props.changeTaskTitle(props.tListId, t.id, newTitle);
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <Checkbox size={'small'} checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} changeTitle={onChangeTaskTitle} />
                            <IconButton onClick={removeTaskHandler} color={'primary'} size={'small'}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </li>
                    )
                })}

            </ul>
            <div>
                <Button sx={{mr: '2px'}} variant={'contained'} color={allButtonStyle} size={'small'} disableElevation onClick={onAllClickHandler}>All</Button>
                <Button sx={{mr: '2px'}} variant={'contained'} color={activeButtonStyle} size={'small'} disableElevation onClick={onActiveClickHandler}>Active</Button>
                <Button variant={'contained'} color={completedButtonStyle} size={'small'} disableElevation onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}