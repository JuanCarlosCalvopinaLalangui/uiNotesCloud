import React, { useEffect } from 'react';
import { Note } from '../App';


interface NotesProps {
    notes: Note[];
    setSelectedNote: (note: Note) => void;
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const Notes: React.FC<NotesProps> = ({ notes, setSelectedNote, setNotes }) => {
    const deleteNote = async (e: React.MouseEvent , id: number) => {
        e.stopPropagation();  // prevent click on note from also clicking parent

        try {
            await fetch(`https://notesapicloud-t3ypwqcijq-uc.a.run.app/api/notes/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.log(error);
        } finally {
            const newNotes = [...notes];   // create a copy of the array to avoid mutating the state directly
            const index = newNotes.findIndex((note) => note.id === id);
            newNotes.splice(index, 1);  // remove the note from the array
            setNotes(newNotes);       // update the state with the new array
        }
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // Fetch the data from the API
            const response = await fetch('https://notesapicloud-t3ypwqcijq-uc.a.run.app/api/notes');
            const notes: Note[] = await response.json();
            setNotes(notes);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    } , [setNotes]);

    return (
        <div className="notes-container">
            {notes.map((note) => (
                <div key={note.id} className="note-item" onClick={()  => setSelectedNote(note)}>
                    <div className="note-header">
                    <button className="delete-button" onClick={(e) => deleteNote(e, note.id)}>X</button>
                    </div>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Notes;