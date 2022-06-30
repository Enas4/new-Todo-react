import { useState } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [add, setAdd] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);

  const addItem = () => {
    if (!input) {
      alert("plz fill data");
    } else if (input && !toggle) {
      setAdd(
        add.map((v) => {
          if (v.id === edit) {
            return { ...v, name: input };
          }
          return v;
        })
      );
      setToggle(true);
      setInput("");
      setEdit(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: input };
      setAdd([...add, allInputData]);
      setInput("");
    }
  };

  const deleteItem = (index) => {
    const filteredItem = add.filter((elem) => {
      return index !== elem.id;
    });
    setAdd(filteredItem);
  };

  const editItem = (id) => {
    const newEditItem = add.find((ele) => {
      return ele.id === id;
    });
    console.log(newEditItem);
    setToggle(false);
    setInput(newEditItem.name);
    setEdit(id);
  };
  return (
    <div className="App">
      <h1>To Do CheckList</h1>
      {/*  */}
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {toggle ? (
        <button onClick={addItem}>add</button>
      ) : (
        <button onClick={addItem}>Edit</button>
      )}

      {/*  */}

      {add.map((val) => {
        return (
          <div
            key={val.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h2>{val.name}</h2>
            <button
              onClick={() => {
                editItem(val.id);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteItem(val.id);
              }}
            >
              delete
            </button>
          </div>
        );
      })}

      {/*  */}
      <button
        onClick={() => {
          setAdd([]);
        }}
      >
        <span>Remove all</span>
      </button>
    </div>
  );
}

export default App;
