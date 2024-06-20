import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateNotes from './CreateNotes';
import Notes from './Notes';
import UpdateNotes from './UpdateNotes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Notes/>}></Route>
        <Route path= '/create' element={<CreateNotes/>}></Route>
        <Route path='/update/:id' element={<UpdateNotes/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
