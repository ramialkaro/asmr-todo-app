import React, { useState, useEffect } from "react";
import TodoCard from './TodoCard.js';
import AddTodo from './AddTodo.js';

const Todo = () => {
  const [selectedTab, setSelectedTab] = useState("Today");
  const [todos, setTodos] = useState([]);

  const tabs = ["Yesterday", "Today", "Tomorrow", "Else"];

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  const removeTodo = id => {
    const updateTodos = todos.filter(todo => todo.id !== id);

    setTodos(updateTodos)
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  const toggleComplete = id => {
    const updateTodos = todos.map(todo =>
      todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
    )

    setTodos(updateTodos)
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  const filterTodos = () => {
    const today = new Date().toISOString().split("T")[0];
    switch (selectedTab) {
      case "Yesterday":
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);

        return todos.filter((todo) => todo.dueDate === yesterday.toISOString().split('T')[0]);

      case "Today":
        return todos.filter((todo) => todo.dueDate === today);

      case "Tomorrow":
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);

        return todos.filter((todo) => todo.dueDate === tomorrow.toISOString().split('T')[0]);

      default:
        return todos;
    }
  }

  const notCompletedTodos = filterTodos().filter(todo => !todo.is_completed)
  const completedTodos = filterTodos().filter(todo => todo.is_completed)

  const renderFiltersTab = (tabs) => {
    return tabs.map((tab) => (
      <button
        key={tab}
        className={`p-2 rounded-md ${selectedTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
      </button>
    ))
  }

  return (
    <div className="w-lg p-4 bg-white dark:bg-gray-800 shadow-sm h-screen">
      <h2 className="text-3xl py-4"> Modern Todo App </h2>

      <AddTodo todos={todos} setTodos={setTodos} />

      <div className="grid grid-cols-4 mb-4 gap-2">
        {renderFiltersTab(tabs)}
      </div>

      {notCompletedTodos.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-10 mb-4">Not Completed Todos </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notCompletedTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo} />
            ))}

          </div>
        </div>
      )}



      {completedTodos.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-10 mb-4"> Completed Todos </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo} />
            ))}

          </div>
        </div>
      )}


      {notCompletedTodos?.length === 0 && completedTodos?.length === 0 && (
        <div>
          No todos found! Let's create one.
        </div>
      )}
    </div>
  )
}


export default Todo;
