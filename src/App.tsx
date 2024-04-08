import "./App.css";
import FormNotes from "./Components/forms";
import Notes from "./Components/notes";
import React, { useState } from "react";

export interface Note {
  id: number;
  title: string;
  content: string;
}

const App = () => {

  const [notes, setNotes] = useState<Note[]>([{id: 1, title: "Note 1", content: "This is the first note" }]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div className="app-container">
      <FormNotes notes={notes} setNotes={setNotes} setSelectedNote={setSelectedNote} selectedNote={selectedNote}></FormNotes>
      <div  className="note-list">
        <h1>Your notes</h1>
        <Notes notes={notes} setSelectedNote={setSelectedNote} setNotes={setNotes}></Notes>
      </div>
    </div>
  );
};

export default App;
