import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmpleadoList from "./components/empleadoList";

function App() {
  return (
    <div className='container'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmpleadoList/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
