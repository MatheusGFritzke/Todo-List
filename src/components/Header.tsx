import style from "./Header.module.css"
import logo from "../assets/logo.svg"

export function Header(params:object) {
    return (
        <div className={style.header}>
            <img src={logo} />
            <span>to<span>do</span></span>
        </div>
    )
}