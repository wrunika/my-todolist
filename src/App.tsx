import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'All' | 'Active' | 'Completed';


function App() {
    const title = 'What to learn';

    const [filterValue, setFilterValue] = useState<FilterValueType>('All')
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ]);

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t=> t.id !== id));
    }
    const changeFilter = (filter: FilterValueType) => {
      setFilterValue(filter)
    }
    const filteredTasks: TaskType[] = tasks.filter(t => filterValue === 'Active' ? !t.isDone : filterValue === 'Completed' ? t.isDone : t);

    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false};
        setTasks([newTask, ...tasks]);
    }


    return (
        <div className="App">
            <Todolist title={title} tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} />
        </div>
    );
}

export default App;

