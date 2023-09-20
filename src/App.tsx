import './Global.css'
import { Header } from './components/Header'
import style from "./App.module.css"
import { Tasks } from './components/Tasks'


function App() {

  return (
    <div>
      <Header />
      <div className={style.main}>
        <Tasks />
      </div>
    </div>
  )
}

export default App
