import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filterValue: FilterValueType
    removeTask: (id: string)=>void
    changeFilter: (filter: FilterValueType)=>void
    addTask: (newTaskTitle: string)=>void
    changeStatus: (taskId: string, isDone: boolean)=>void
}
export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState(false);
    const errorMessage = 'Title is required';

    const allButtonStyle = props.filterValue === 'All' ? 'filterButton' : '';
    const activeButtonStyle = props.filterValue === 'Active' ? 'filterButton' : '';
    const completedButtonStyle = props.filterValue === 'Completed' ? 'filterButton' : '';
    const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
      newTaskTitle.trim() === '' ? setError(true) : props.addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
              addTaskHandler();
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={newTaskTitle} onChange={getInputValue} onKeyDown={onKeyDownHandler} />
                <button onClick={addTaskHandler}>+</button>
                {error && <p className={'errorMessage'}>{errorMessage}</p>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
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