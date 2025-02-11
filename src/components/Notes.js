import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            props.showAlert('You are not logged in', 'danger');
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({
        id: '',
        etitle: '',
        edescription: '',
        etag: 'default',
    });

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert('Updated Successfully', 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };

    return (
        <>
            <Addnote showAlert={props.showAlert} />

            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={ref}
            >
                Edit note
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="">
                                <div className="mb-3">
                                    <label
                                        htmlFor="etitle"
                                        className="form-label"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        onChange={onChange}
                                        value={note.etitle}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="edescription"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        onChange={onChange}
                                        value={note.edescription}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="etag"
                                        className="form-label"
                                    >
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        onChange={onChange}
                                        value={note.etag}
                                        minLength={5}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={refClose}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={handleClick}
                                className="btn btn-primary"
                                disabled={
                                    note.etitle.length < 5 ||
                                    note.edescription.length < 5
                                }
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.length > 0 &&
                    notes.map((note) => {
                        return (
                            <Noteitem
                                key={note._id}
                                updateNote={updateNote}
                                note={note}
                                showAlert={props.showAlert}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default Notes;
