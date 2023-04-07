import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


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

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    //const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    /*const removeTask = (tListId: string, taskId: string) => {
        dispatch(removeTaskAC(tListId, taskId));
    }*/
    const changeFilter = (tListId: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(tListId, filter));
    };

    /*const addTask = (tListId: string, newTaskTitle: string) => {
        dispatch(addTaskAC(tListId, newTaskTitle));
    }

    const changeStatus = (tListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(tListId, taskId, isDone));
    }*/
    const removeTodolist = (tListId: string) => {
        dispatch(removeTodolistAC(tListId));
    }
    const addNewTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle));
    }
    const changeTodolistTitle = (tListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(tListId, newTitle));
    }
    /*const changeTaskTitle = (tListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(tListId, taskId, newTitle));
    }*/


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
                        /*const filteredTasks: TaskType[] = tasks[tl.id].filter(t => tl.filterValue === 'Active'
                            ? !t.isDone
                            : tl.filterValue === 'Completed'
                                ? t.isDone : t);*/

                        return (
                            <Grid key={tl.id} item>
                                <Paper key={tl.id} variant={'outlined'} sx={{p: '20px'}}>
                                    <Todolist key={tl.id}
                                              tListId={tl.id}
                                              title={tl.title}
                                              /*tasks={filteredTasks}*/
                                              filterValue={tl.filterValue}
                                              /*removeTask={removeTask}*/
                                              changeFilter={changeFilter}
                                              /*addTask={addTask}
                                              changeStatus={changeStatus}*/
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                              /*changeTaskTitle={changeTaskTitle}*/
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

export default AppWithRedux;

