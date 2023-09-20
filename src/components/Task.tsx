import { useState, ChangeEvent } from "react";
import style from "./Task.module.css"
import deleteIconGray from "../assets/lixeira-cinza.svg"
import deleteIconRed from "../assets/lixeira-vermelha.svg"

interface TaskProps {
    text: string,
    deleteTask: (id: string) => void,
    changeCheckedTask: (data: { id: string, checked: boolean }) => void,
    id: string,
    checked: boolean
}

export function Task({ text, deleteTask, changeCheckedTask, id, checked }: TaskProps) {

    const [deleteIcon, setDeleteIcon] = useState(deleteIconGray);

    function handleDeleteTask() {
        deleteTask(id);
    }

    function handleSetDeleteIconRed() {
        setDeleteIcon(deleteIconRed)
    }

    function handleSetDeleteIconGray() {
        setDeleteIcon(deleteIconGray)
    }

    function handleCheckedTask(event: ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        changeCheckedTask({ id, checked })
    }

    return (
        <div className={style.mainDiv}>
            <div className={style.taskDiv}>
                <input className={style.checkbox} type="checkbox" onChange={handleCheckedTask} checked={checked} />
                <span>
                    {text}
                </span>
                <img
                    className={style.image}
                    src={deleteIcon}
                    onMouseEnter={handleSetDeleteIconRed}
                    onMouseLeave={handleSetDeleteIconGray}
                    onClick={handleDeleteTask}
                />
            </div>
        </div>
    )
}