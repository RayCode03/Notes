import { useState } from "react";
import { Notas } from "./Components/Notas";

function App(props) {
  const [note, setNote] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  if(props.notes.length === 0 || typeof props.notes === "undefined"){
    return "No hay valor en las notas"
  }

  const handleChange = (event) => {
    //console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleShow = () => {
    setShowAll(() => !showAll);
  };

  const handleSubmit = (event) => {

    console.log("Se creo nota");

    event.preventDefault();

    const noteToAddToState = {
      id: note.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    console.log(noteToAddToState);

    setNote(note.concat(noteToAddToState));

    setNewNote("");
  };

  return (
    <>
      <h1>Notes</h1>
      <button onClick={handleShow}>
        {showAll ? "Show only important" : "Show all"}
      </button>
      <ol>
        {note
          .filter((note) => {
            if (showAll === true) return true;
            return note.important === true;
          })
          .map((note) => {
            return <Notas key={note.id} {...note} />;
          })}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}/>
        <button>Crear Nota</button>
      </form>
    </>
  );
}

export default App;
