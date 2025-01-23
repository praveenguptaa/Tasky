import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    let todoString = localStorage.getItem("todos");
    if(!todoString) return [];
    return JSON.parse(todoString);
  })
  const [showFinished, setshowFinished] = useState(true);


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  saveToLS();

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()


  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()

  }

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 p-5 rounded-md bg-slate-300 min-h-[80vh] md:w-[50%]">
        <h1 className='font-bold text-center text-3xl'>Tasky - Manage Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='w-full px-2 py-1 rounded-md' type="text" name="" id="" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-500 hover:bg-slate-700 disabled:bg-slate-400 text-white rounded-md px-2 py-1 text-sm font font-bold'>Save</button>
        </div>
        <input className='my-4' id="show" onChange={toggleFinished} type="checkbox" name=""  checked={showFinished} /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 ">
              <div className='flex gap-5 '>
                <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={todo.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-slate-500 hover:bg-slate-700 text-white rounded-md p-2 py-1 mx-1 text-sm font font-bold'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-slate-500 hover:bg-slate-700 text-white rounded-md p-2 py-1 mx-1 text-sm font font-bold'><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>



      </div>
    </>
  )
}

export default App
