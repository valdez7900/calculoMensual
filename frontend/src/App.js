import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmpleadoList from "./components/empleadoList";
import EmpleadoAdd from "./components/empleadoAdd";
import EmpleadoEdit from "./components/empleadoEdit";

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmpleadoList/>}/>
        <Route path="/add" element={<EmpleadoAdd/>}/>
        <Route path="/edit/:id" element={<EmpleadoEdit/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
