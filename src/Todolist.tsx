import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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

    const allButtonStyle = props.filterValue === 'All' ? 'filterButton' : '';
    const activeButtonStyle = props.filterValue === 'Active' ? 'filterButton' : '';
    const completedButtonStyle = props.filterValue === 'Completed' ? 'filterButton' : '';
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
            <button onClick={removeTodolistHandler}>X</button>

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
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} changeTitle={onChangeTaskTitle} />
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={allButtonStyle} onClick={onAllClickHandler}>All</button>
                <button className={activeButtonStyle} onClick={onActiveClickHandler}>Active</button>
                <button className={completedButtonStyle} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}