import {TasksStateType} from "../App";
//import {AddTodolistACType, RemoveTodolistACType, todolistID1, todolistID2} from "./todolists-reducer";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";
import {v1} from "uuid";


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | RemoveTodolistACType | AddTodolistACType

const initialState: TasksStateType = {
    /*[todolistID1]: [
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
    ],*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
      case "REMOVE-TASK":
          return {...state, [action.tListId]: state[action.tListId].filter(t => t.id !== action.taskId)};
      case "ADD-TASK":
          const newTask = {id: v1(), title: action.title, isDone: false};
          return {...state, [action.tListId]: [newTask, ...state[action.tListId]]};
      case "CHANGE-TASK-STATUS":
          return {...state, [action.tListId]: state[action.tListId].map(t=> t.id===action.taskId ? {...t, isDone: action.isDone} : t)};
      case "CHANGE-TASK-TITLE":
          return {...state, [action.tListId]: state[action.tListId].map(t=> t.id === action.taskId ? {...t, title: action.title} : t)};
      case "REMOVE-TODOLIST":
          const newState = {...state};
          delete newState[action.id];
          return newState;
      case "ADD-TODOLIST":
          debugger
          return {...state, [action.newTodolistID]: []};
      default:
          return state;
  }
}

export const removeTaskAC = (tListId: string, taskId: string) => {
  return {
      type: 'REMOVE-TASK',
      tListId,
      taskId
  } as const
}

export const addTaskAC = (tListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        tListId,
        title
    } as const
}
export const changeTaskStatusAC = (tListId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        tListId,
        taskId,
        isDone
    } as const
}
export const changeTaskTitleAC = (tListId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        tListId,
        taskId,
        title
    } as const
}
