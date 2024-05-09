import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = process.env.REACT_APP_HOST;
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //Get all notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });

        const json = await response.json();
        setNotes(json);
    };

    //Add a note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    };

    //Delete a note
    const deleteNote = async (id) => {
        // API Call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const updatedNotes = notes.map((note) => {
            if (note._id === id) {
                return { ...note, title, description, tag };
            }
            return note;
        });

        setNotes(updatedNotes);
    };

    return (
        <NoteContext.Provider
            value={{ notes, addNote, deleteNote, editNote, getNotes }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
