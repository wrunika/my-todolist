import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


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

function AppWithReducers() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filterValue: 'All'},
        {id: todolistID2, title: 'What to buy', filterValue: 'All'},

    ]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTasks(removeTaskAC(tListId, taskId));
    }
    const changeFilter = (tListId: string, filter: FilterValueType) => {
        dispatchTodolists(changeTodolistFilterAC(tListId, filter));
    };

    const addTask = (tListId: string, newTaskTitle: string) => {
        dispatchTasks(addTaskAC(tListId, newTaskTitle));
    }

    const changeStatus = (tListId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(tListId, taskId, isDone));
    }
    const removeTodolist = (tListId: string) => {
        dispatchTodolists(removeTodolistAC(tListId));
        dispatchTasks(removeTodolistAC(tListId));
    }
    const addNewTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle);
        dispatchTodolists(action);
        dispatchTasks(action);

    }
    const changeTodolistTitle = (tListId: string, newTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(tListId, newTitle));
    }
    const changeTaskTitle = (tListId: string, taskId: string, newTitle: string) => {
        dispatchTasks(changeTaskTitleAC(tListId, taskId, newTitle));
    }


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton
                        size={'large'}
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                        sx={{mt: 2}}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}} >
                        Todolists
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid sx={{p: '10px 0'}} container>
                    <AddItemForm addNewForm={addNewTodolist} />
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        const filteredTasks: TaskType[] = tasks[tl.id].filter(t => tl.filterValue === 'Active'
                            ? !t.isDone
                            : tl.filterValue === 'Completed'
                                ? t.isDone : t);

                        return (
                            <Grid key={tl.id} item>
                                <Paper key={tl.id} variant={'outlined'} sx={{p: '20px'}}>
                                    <Todolist key={tl.id}
                                              tListId={tl.id}
                                              title={tl.title}
                                              tasks={filteredTasks}
                                              filterValue={tl.filterValue}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                              changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

