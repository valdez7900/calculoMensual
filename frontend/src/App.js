import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmpleadoList from "./components/empleadoList";
import EmpleadoAdd from "./components/empleadoAdd";
import EmpleadoEdit from "./components/empleadoEdit";
import EmpleadoMove from "./components/empleadoMove";

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmpleadoList/>}/>
        <Route path="/add" element={<EmpleadoAdd/>}/>
        <Route path="/edit/:id" element={<EmpleadoEdit/>}/>
        <Route path="/move/:id" element={<EmpleadoMove/>}/>
        <Route path="/addMove" element={<EmpleadoMove/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
