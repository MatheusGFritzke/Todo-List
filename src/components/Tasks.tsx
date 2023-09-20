import { useState, ChangeEvent, useRef } from "react";
import style from "./Tasks.module.css"
import buttonIcon from "../assets/iconPlus.svg"
import { Task } from "./Task";
import clipBoard from "../assets/Clipboard.png"

interface TaskChecked {
    id: string,
    checked: boolean,
}

interface Tasks {
    text: string,
    checked: boolean,
    id: string
}

export function Tasks() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [tasks, setTasks] = useState<Array<Tasks>>([])
    const [quantityChecked, setQuantityChecked] = useState(0);

    const defaultValue = "Adicione uma nova tarefa";
    const [textNewTask, setTextNewTask] = useState(defaultValue)

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("");
        setTextNewTask(event.target.value);
    }

    function clearDefaultValueInput(event: ChangeEvent<HTMLInputElement> | undefined) {
        if (event?.target.value === defaultValue || !event) {
            setTextNewTask("");
        }
    }

    function setDefaultValueInput(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value === "") {
            setTextNewTask(defaultValue);
        }
    }

    function handleClickAddButton() {
        const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const newTask = {
            text: textNewTask,
            checked: false,
            id: id,
        }
        setTasks([...tasks, newTask]);
        inputRef.current?.focus();
        clearDefaultValueInput(undefined)
    }

    function deleteTask(id: string) {
        const restListAfterDelete = tasks.filter(task => task.id !== id);
        const removeCheckedCount = tasks.filter(task => task.id === id)[0].checked;
        setTasks([...restListAfterDelete]);
        if (removeCheckedCount) setQuantityChecked(value => {
            return value - 1;
        });
    }
    
    function changeCheckedTask(object: TaskChecked) {
        let quantityChecked = 0;
        
        const updatedCheckedTasks = tasks;
        for (const task of updatedCheckedTasks) {
            if (task.id === object.id) {
                task.checked = object.checked;
            }
            if(task.checked) quantityChecked +=1;
        }        
        setTasks(updatedCheckedTasks);
        setQuantityChecked(quantityChecked);
    }

    return (
        <div>
            <div className={style.inputDiv}>
                <input
                    className={style.inputText}
                    type="text"
                    name="new-task"
                    id="new-task"
                    value={textNewTask}
                    onChange={handleOnChange}
                    onFocus={clearDefaultValueInput}
                    onBlur={setDefaultValueInput}
                    ref={inputRef}
                />
                <button
                    className={style.inputButton}
                    onClick={handleClickAddButton}
                    disabled={textNewTask === defaultValue || textNewTask === ""}
                    type="button">
                    Criar <img src={buttonIcon} />
                </button>
            </div>
            <div className={style.tasksDiv}>
                <header className={style.header}>
                    <div className={style.divCreated}>
                        <div>
                            Tarefas criadas
                        </div>
                        <span>{tasks.length}</span>
                    </div>
                    <div className={style.divFinished}>
                        Concluídas <span>{quantityChecked} de {tasks.length}</span>
                    </div>
                </header>
                <div className={style.taskDiv}>
                    {tasks.length === 0 ? 
                    <div className={style.notFoundTasks}>
                        <img src={clipBoard}/>
                        <span>Você ainda não tem tarefas cadastradas</span>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                    
                    : undefined}
                    {tasks.map((task) => (
                        <Task
                            text={task.text}
                            key={task.id}
                            deleteTask={deleteTask}
                            changeCheckedTask={changeCheckedTask}
                            id={task.id}
                            checked={task.checked}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}