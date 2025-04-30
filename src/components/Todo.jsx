import React, { useEffect, useRef, useState } from 'react'
import calender from '../assets/calender.png'
import PlusSignBtn from '../assets/PlusSignBtn.png'
import Todoitems from './Todoitems'

const ToDo = () => {

  const [todoList, setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")) : []);

const inputRef = useRef()

const add = () => {
  const inputText = inputRef.current.value.trim() ;

  if (inputText === "") {
    return null
  }

  const newTodo = {
    id: Date.now(),
    text: inputText,
    isComplete: "False",
  }
  setTodoList((prev) => [...prev, newTodo] )
  inputRef.current.val = "" ;
}


const deleteTodo = (id) => {
  setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id)
  })
}

const toggle = (id) => {
  setTodoList((prevTodos) => {
    return prevTodos.map((todo) => {
      if (todo.id === id){
        return {...todo, isComplete: !todo.isComplete}
      }
      return todo ;
    })
  })
}

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todoList))
}, [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md
    flex flex-col p-7 min-h-[550px] rounded-xl border-fuchsia-950 border-[0.5vw]'>
    
<div className='flex items-center mt-7 gap-2'>
    <img className='w-8' src = {calender}/>
    <h1 className='text-3xl font-semibold'>Nudge Do List</h1>
</div>



<div className='flex items-center my-7 bg-gray-200'>
    <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type ='text' placeholder ='Task To Complete' />
    <button onClick={add} className='border-none rounded-full bg-pink-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add +</button>
</div>




<div>

    {todoList.map((item, index) => {
      return <Todoitems key={index} text={item.text} id = {item.id} 
      isComplete = {item.isComplete} deleteTodo = {deleteTodo} toggle = {toggle}/>
    })}
</div>
    
    </div>
  )
}

export default ToDo