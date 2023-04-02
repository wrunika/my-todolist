import React from "react";
import {FilterValueType, TaskType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number)=>void
    changeFilter: (filter: FilterValueType)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    const removeTaskHandler = (id: number) => {
        props.removeTask(id)
    }
    const changeFilterHandler = (filter: FilterValueType) => {
        props.changeFilter(filter)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ ()=>removeTaskHandler(t.id) }>X</button></li>)}

            </ul>
            <div>
                <button onClick={ ()=>changeFilterHandler('All') }>All</button>
                <button onClick={ ()=>changeFilterHandler('Active') }>Active</button>
                <button onClick={ ()=>changeFilterHandler('Completed') }>Completed</button>
            </div>
        </div>
    )
}