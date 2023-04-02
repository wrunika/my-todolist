import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = 'All' | 'Active' | 'Completed';


function App() {
    const title = 'What to learn';

    const [filterValue, setFilterValue] = useState<FilterValueType>('All')
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]);

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t=> t.id !== id));
    }
    const changeFilter = (filter: FilterValueType) => {
      setFilterValue(filter)
    }

    const filteredTasks: TaskType[] = tasks.filter(t => filterValue === 'Active' ? !t.isDone : filterValue === 'Completed' ? t.isDone : t);


    return (
        <div className="App">
            <Todolist title={title} tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter} />
        </div>
    );
}

export default App;

