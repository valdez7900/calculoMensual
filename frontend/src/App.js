import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmpleadoList from "./components/empleadoList";
import EmpleadoAdd from "./components/empleadoAdd";
import EmpleadoEdit from "./components/empleadoEdit";
import EmpleadoMove from "./components/empleadoMove";
import MoveAdd from "./components/moveAdd";
import MoveEdit from "./components/moveEdit";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<EmpleadoList/>}/>
        <Route path="/add" element={<EmpleadoAdd/>}/>
        <Route path="/edit/:id" element={<EmpleadoEdit/>}/>
        <Route path="/move/:id" element={<EmpleadoMove/>}/>
        <Route path="/addMove/:id" element={<MoveAdd/>}/>
        <Route path="/editMove/:id" element={<MoveEdit/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
