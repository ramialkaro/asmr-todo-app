import React, { useState } from 'react';

const AddTodo = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: new Date().toISOString().split('T')[0] });

  const addTodo = () => {
    if (newTodo.title.trim !== '') {
      const updateTodos = [...todos, { ...newTodo, id: Date.now(), is_completed: false }]

      setTodos(updateTodos);
      localStorage.setItem("todos", JSON.stringify(updateTodos))

      //reset to default
      setNewTodo({ title: '', description: '', dueDate: new Date().toISOString().split('T')[0] })
    }
  }

  return (

    <form className="grid md:grid-cols-8 md:gap-2 mb-4">
      <input
        type="text"
        className="col-span-3 py-2 px-4 border rounded-md mb-2 md:mb-0 md:mr-2 focus:outline-none focus:border-green-500"
        placeholder="Todo title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
      />

      <input
        type="text"
        className="col-span-3 py-2 px-4 border rounded-md mb-2 md:mb-0 md:mr-2 focus:outline-none focus:border-green-500"
        placeholder="Todo description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
      />

      <input
        type="date"
        className="col-span-3 lg:col-span-1 py-2 px-4 border rounded-md mb-2 md:mb-0 md:mr-2 focus:outline-none focus:border-green-500"
        value={newTodo.dueDate}
        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
      />

      <button
        className="col-span-3 lg:col-span-1  py-2 px-4 bg-green-500 rounded-md hover:bg-green-600 transition duration-300 text-white"
        onClick={addTodo}
      >
        Add
      </button>




    </form>
  )

}


export default AddTodo;
