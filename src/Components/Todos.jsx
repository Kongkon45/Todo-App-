import React, { useState } from "react";


import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Todos = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "roll") {
      setRoll(value);
    }
  };

  const handleSubmitData = (e) => {
    e.preventDefault();

    if (updateIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[updateIndex] = { name, email, roll };
      setTodos(updatedTodos);
      setUpdateIndex(null);
    } else {
      const newTodo = { name, email, roll };
      setTodos([...todos, newTodo]);
    }

    setName("");
    setEmail("");
    setRoll("");
    setIsFormVisible(false);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });

  
    // const updatedTodos = [...todos];
    // updatedTodos.splice(index, 1);
    // setTodos(updatedTodos);
  };

  const handleUpdate = (index) => {
    setUpdateIndex(index);
    const selectedTodo = todos[index];
    setName(selectedTodo.name);
    setEmail(selectedTodo.email);
    setRoll(selectedTodo.roll);
    setIsFormVisible(true);
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  const handleTodoOpen = () => {
    setIsFormVisible(true);
  };

  return (
    <div>
      <h1 className="text-center text-4xl my-3 text-black">Todo App</h1>

      <button
        className="bg-green-400 text-white py-2 px-4 rounded-lg ml-[600px]"
        onClick={handleTodoOpen}
      >
        Add Todo
      </button>

      {isFormVisible && (
        <form
          onSubmit={handleSubmitData}
          className="w-1/3 mx-auto border p-5 cursor-pointer rounded-lg shadow-xl mt-4"
        >
          <div
            onClick={handleClose}
            className="text-2xl font-bold mb-3 flex justify-end"
          >
            <RxCrossCircled />
          </div>
          <input
            className="border-2 p-2 rounded-md my-1 w-full"
            value={name}
            onChange={handleChangeValue}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name..."
          />
          <br />
          <input
            className="border-2 p-2 rounded-md my-1 w-full"
            value={email}
            onChange={handleChangeValue}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
          />
          <br />
          <input
            className="border-2 p-2 rounded-md my-1 w-full"
            value={roll}
            onChange={handleChangeValue}
            type="number"
            name="roll"
            id="roll"
            placeholder="Enter your roll..."
          />
          <br />
          <button
            className="bg-green-400 py-2 px-4 rounded-lg ml-32 mt-3 text-white "
            type="submit"
          >
            {updateIndex !== null ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      )}

      <div className="mt-5">
        <table className="w-1/2 mx-auto border-2">
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th className="border-2">Email</th>
              <th className="border-2">Roll</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr className="border-2" key={index}>
                <td>{todo.name}</td>
                <td className="border-2">{todo.email}</td>
                <td className="border-r-2">{todo.roll}</td>
                <td className="flex justify-around">
                  <button
                    onClick={() => handleUpdate(index)}
                    className="bg-green-400 text-white py-2 px-2 rounded-lg mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-400 text-white py-2 px-2 rounded-lg"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todos;
