import {v1} from "uuid";
import {TaskType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let todolistID1: string;
let todolistID2: string;
let startTasks: {
    [key: string]: TaskType[]
}
beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startTasks = {
        [todolistID1]: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: '5', title: 'Laptop', isDone: true},
            {id: '6', title: 'Display', isDone: true},
            {id: '7', title: 'Notebook', isDone: false},
            {id: '8', title: 'Pen', isDone: false},
        ],
    }
})
test('correct task should be removed', () => {
    const endState = tasksReducer(startTasks, removeTaskAC(todolistID2, '8'));

    expect(endState[todolistID2].length).toBe(3);
    expect(endState[todolistID1].length).toBe(4);
})

test('correct task should be added', () => {
    const endState = tasksReducer(startTasks, addTaskAC(todolistID1, 'Water'));

    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID1][4].title).toBe('Water');
    expect(endState[todolistID1][4].isDone).toBe(false);
})

test('correct task status should be changed', () => {
    const endState = tasksReducer(startTasks, changeTaskStatusAC(todolistID1, '3', true));

    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2][2].isDone).toBe(false);
    expect(endState[todolistID1][2].isDone).toBe(true);
})

test('correct task title should be changed', () => {
    const endState = tasksReducer(startTasks, changeTaskTitleAC(todolistID2, '8', 'Purple pen'));

    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2][3].title).toBe('Purple pen');
    expect(endState[todolistID1][3].title).toBe('Redux');
})

test('correct array should be removed when some todolist is removed', () => {
    const endState = tasksReducer(startTasks, removeTodolistAC(todolistID2));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistID2]).not.toBeDefined();
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist');
    const endState = tasksReducer(startTasks, action);
    const keys = Object.keys(endState)
    const newKey: string = keys.find(k => k != todolistID1 && k != todolistID2) || '';

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})
