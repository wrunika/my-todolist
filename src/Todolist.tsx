import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string)=>void
    changeFilter: (filter: FilterValueType)=>void
    addTask: (newTaskTitle: string)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    const  [newTaskTitle, setNewTaskTitle] = useState('');

    const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
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
                <input value={newTaskTitle} onChange={getInputValue} onKeyDown={onKeyDownHandler} />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={removeTaskHandler}>X</button></li>
                    )})}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}