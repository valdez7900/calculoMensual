import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmpleadoList from "./components/empleadoList";
import EmpleadoAdd from "./components/empleadoAdd";

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmpleadoList/>}/>
        <Route path="/add" element={<EmpleadoAdd/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
