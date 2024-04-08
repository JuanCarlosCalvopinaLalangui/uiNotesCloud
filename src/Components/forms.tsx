import React, { useEffect, useState } from "react";
import { Note } from "../App";

interface FormNotesProps {
  notes: Note[];
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const FormNotes: React.FC<FormNotesProps> = ({
  notes,
  selectedNote,
  setSelectedNote,
  setNotes,
}) => {
  const [title, setTitle] = useState(selectedNote ? selectedNote?.title : "");
  const [content, setContent] = useState(
    selectedNote ? selectedNote?.content : ""
  );
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length === 0 || content.length === 0) {
      alert ("Please enter a title and content for the note.");
    }else{
      try {
        const response = await fetch("http://localhost:3030/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, content: content }),
        });
        const newNote = await response.json();
        alert(`Added note with ID: ${newNote.id}`);
        setNotes([...notes, newNote] as Note[]);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3030/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, content: content }),
        }
      );

      const updateNote = await response.json();

      const updatedNoteList = notes.map((note) =>
        note.id === selectedNote.id ? updateNote : note
      );
      
      setNotes(updatedNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{selectedNote ? "Edit Note" : "Add a new note"}</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Enter your note's title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          placeholder="Enter your note's content"
          onChange={handleContentChange}
          rows={10}
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button onClick={handleUpdateNote}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </div>
    </form>
  );
};

export default FormNotes;
