import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistPropsType = {
    tListId: string
    title: string
    tasks: Array<TaskType>
    filterValue: FilterValueType
    removeTask: (tListId: string, taskId: string)=>void
    changeFilter: (tListId: string, filter: FilterValueType)=>void
    addTask: (tListId: string, newTaskTitle: string)=>void
    changeStatus: (tListId: string, taskId: string, isDone: boolean)=>void
    removeTodolist: (tListId: string)=>void
}
export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState(false);
    const errorMessage = 'Title is required';

    const allButtonStyle = props.filterValue === 'All' ? 'filterButton' : '';
    const activeButtonStyle = props.filterValue === 'Active' ? 'filterButton' : '';
    const completedButtonStyle = props.filterValue === 'Completed' ? 'filterButton' : '';
    const onAllClickHandler = () => props.changeFilter(props.tListId, 'All');
    const onActiveClickHandler = () => props.changeFilter(props.tListId, 'Active');
    const onCompletedClickHandler = () => props.changeFilter(props.tListId, 'Completed');

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
      newTaskTitle.trim() === '' ? setError(true) : props.addTask(props.tListId, newTaskTitle.trim());
      setNewTaskTitle('');
    }
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
              addTaskHandler();
        }
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.tListId);
    }


    return (
        <div>
            <h3 className={'tlTitle'}>{props.title}</h3>
            <button onClick={removeTodolistHandler}>X</button>
            <div>
                <input className={error ? 'error' : ''} value={newTaskTitle} onChange={getInputValue} onKeyDown={onKeyDownHandler} />
                <button onClick={addTaskHandler}>+</button>
                {error && <p className={'errorMessage'}>{errorMessage}</p>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.tListId, t.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.tListId, t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )})}

            </ul>
            <div>
                <button className={allButtonStyle} onClick={onAllClickHandler}>All</button>
                <button className={activeButtonStyle} onClick={onActiveClickHandler}>Active</button>
                <button className={completedButtonStyle} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}