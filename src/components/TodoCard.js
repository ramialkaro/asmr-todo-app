
const TodoCard = ({ todo, toggleComplete, removeTodo }) => {


  return (
    <div className={`grid grid-rows-3 border text-left p-4 rounded-md hover:bg-gray-50 transition duration-300 ${todo.is_completed && 'bg-green-100'}`}>

      <div className="mb-2">
        <span className={todo.is_completed && 'line-through text-gray-500'}>
          {todo.title}
        </span>
      </div>
      {todo.description && (
        <p className="text-sm text-gray-500">{todo.description}</p>
      )}

      <div className="mt-2 grid grid-cols-4">
        <button
          className="text-green-500 hover:text-green-700 focus:outline-none"
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.is_completed ? 'undo' : 'done'}
        </button>

        <button
          className="text-red-500 hover:text-red-700 focus:outline-none"
          onClick={() => removeTodo(todo.id)}
        >
          Delete
        </button>
      </div>

    </div>
  )
}


export default TodoCard;
