import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Lütfen bir görev girin.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    toast.success("Eklendi", {
      position: "top-right",
      autoClose: 5000,
    });

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div>
        <ToastContainer />
      </div>

      {props.edit ? (
        <>
          <input
            placeholder="Güncelle"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Güncelle
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Hadi bir şeyler ekle..."
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            EKLE
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
