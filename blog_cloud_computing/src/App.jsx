import { Outlet } from "react-router-dom";
import Menu from './composants/Menu'
import './App.css'


function App() {

  return (
    <div className="App">
      <Menu />
        <div className="container">
          <Outlet />
        </div>
    </div>
  )
}

export default App
