import { Landing, Home, Detail, Form } from './views'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/post' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
