import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filterValue: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filterValue: 'All'},
        {id: todolistID2, title: 'What to buy', filterValue: 'All'},

    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Laptop', isDone: true},
            {id: v1(), title: 'Display', isDone: true},
            {id: v1(), title: 'Notebook', isDone: false},
            {id: v1(), title: 'Pen', isDone: false},
        ],
    });

    const removeTask = (tListId: string, taskId: string) => {
        setTasks({...tasks, [tListId]: tasks[tListId].filter(t => t.id !== taskId)});
    }
    const changeFilter = (tListId: string, filter: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === tListId ? {...tl, filterValue: filter} : tl));
    };

    const addTask = (tListId: string, newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false};
        setTasks({...tasks, [tListId]: [newTask, ...tasks[tListId]]});
    }

    const changeStatus = (tListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [tListId]: tasks[tListId].map(t => t.id === taskId ? {...t, isDone} : t)});
    }
    const removeTodolist = (tListId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== tListId));
        const newTasks = {...tasks};
        delete newTasks[tListId]
        setTasks(newTasks);
    }
    const addNewTodolist = (newTitle: string) => {
        console.log('add')
        const newTodolistID = v1();
        const newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filterValue: 'All'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({[newTodolistID]: [], ...tasks});

    }


    return (
        <div className="App">
            <AddItemForm addNewForm={addNewTodolist} />
            {todolists.map(tl => {
                const filteredTasks: TaskType[] = tasks[tl.id].filter(t => tl.filterValue === 'Active'
                    ? !t.isDone
                    : tl.filterValue === 'Completed'
                        ? t.isDone : t);

                return <Todolist key={tl.id}
                                           tListId={tl.id}
                                           title={tl.title}
                                           tasks={filteredTasks}
                                           filterValue={tl.filterValue}
                                           removeTask={removeTask}
                                           changeFilter={changeFilter}
                                           addTask={addTask}
                                           changeStatus={changeStatus}
                                           removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;

