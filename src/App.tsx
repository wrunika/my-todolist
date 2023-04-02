import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
function App() {
    const title1 = 'What to learn';
    const title2 = 'What to buy';

    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 1, title: 'JS', isDone: true},
        {id: 1, title: 'React', isDone: false},
    ];
    const tasks2: Array<TaskType> = [
        {id: 1, title: 'Laptop', isDone: true},
        {id: 1, title: 'Display', isDone: true},
        {id: 1, title: 'Notebook', isDone: true},
    ];
    return (
        <div className="App">
            <Todolist title={title1} tasks={tasks1} />
            <Todolist title={title2} tasks={tasks2} />
        </div>
    );
}

export default App;

