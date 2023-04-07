import {FilterValueType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

//export const todolistID1 = v1();
//export const todolistID2 = v1();
const initialState: Array<TodolistType> = [
    /*{id: todolistID1, title: 'What to learn', filterValue: 'All'},
    {id: todolistID2, title: 'What to buy', filterValue: 'All'},*/
];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=> tl.id !== action.id);
        case 'ADD-TODOLIST':
            debugger
            return [{id: action.newTodolistID, title: action.title, filterValue: 'All'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=> tl.id === action.id ? {...tl, filterValue: action.filter} : tl)
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => {
  return {
      type: 'REMOVE-TODOLIST',
      id
  } as const
}
export const addTodolistAC = (title: string) => {
    const newTodolistID = v1();
    return {
        type: 'ADD-TODOLIST',
        title,
        newTodolistID
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}