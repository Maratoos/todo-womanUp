import { Route, Routes } from 'react-router-dom'
import { Todo } from './components/Todo/Todo'
import { Home } from './Pages/Home/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos/:id' element={<Todo />} />
      </Routes>
    </div>
  )
}

export default App
