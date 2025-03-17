import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getNotes, createNote, updateNote, deleteNote } from "../../../services/noteService.js";

import { isAuthenticated, logout } from "../../../services/authService.js";
import { ButtonComponent } from "../../../components/ButtonComponent.jsx";
import { AlertComponent } from "../../../components/AlertComponent.jsx";
import { DialogComponent } from "../../../components/DialogComponent.jsx";

import { TextField, Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import styles from './styles.module.css';

export const CrudNotes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const [infoAlert, setinfoAlert] = useState({ openAlert: false, title: '', severity: '' });
    const [open, setopen] = useState(false);
    const [noteId, setnoteId] = useState(null);
    const navigate = useNavigate();
    //verificamos user autenticado
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login"); // Redirigir al login si no hay token
        } else {
            loadNotes();
        }
    }, []);

    const loadNotes = async () => { //cargamos las notas de la API
        try {
            const data = await getNotes();
            setNotes(data);
        } catch (error) {
            console.error("Error al cargar notas:", error);
        }
    };

    const handleSaveNote = async () => { // guardamos  o actualizamos la nota
        try {
            if (editingNote) {
                await updateNote(editingNote.id, { title, content });// si hay una nota para actualizar 
                setinfoAlert({ openAlert: true, title: 'The note was update correctly!', severity: 'success' });
            } else {
                await createNote({ title, content }); // si no hay nota para actulizar agregamos una
                setinfoAlert({ openAlert: true, title: 'The note was added correctly!', severity: 'success' });
            }

            setTitle("");
            setContent("");
            setEditingNote(null);
            loadNotes();
        } catch (error) {
            setinfoAlert({ openAlert: true, title: 'Error saving note', severity: 'error' });
        }
    };

    const handleDeleteNote = async (id) => { // eliminar notas
        try {
            await deleteNote(id);
            setinfoAlert({ openAlert: true, title: "Note successfully deleted!", severity: 'success' });
            setopen(false);
            loadNotes();
        } catch (err) {
            console.error("Error al eliminar la nota:", err);
        }
    };

    const handleEditNote = (note) => { // cargamos la nota en el form para editarla
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleCancelEdit = () => { // cancelamos la edicion
        setTitle("");
        setContent("");
        setEditingNote(null);
    };

    const handleOpenDialogConfirm = (noteId) => {
        setopen(true);
        setnoteId(noteId);
    }

    const handleLogout = () => { // cerrar sesión 
        logout();
        navigate("/login");
    };

    return (
        <div className={styles.mainContainerNotes}>
            <div style={{ width: '100%' }}>
                <ButtonComponent
                    id="logOut"
                    title="Logout"
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={handleLogout}
                />
            </div>
            <div style={{ padding: '1rem' }}>
                <h1>Notes</h1>
                <div style={{ marginTop: 20 }}>
                    <TextField
                        required
                        label="Title"
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        required
                        label="Content"
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ marginBottom: 10 }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ButtonComponent
                            id="addNote"
                            title={editingNote ? "Update" : "Add"}
                            variant="contained"
                            color="secondary"
                            disabled={!title || !content} // Deshabilitado si no hay contenido
                            size="medium"
                            onClick={handleSaveNote}
                        />
                        {editingNote && (
                            <ButtonComponent
                                id="cancelEdit"
                                title="Cancel"
                                variant="outlined"
                                color="secondary"
                                size="medium"
                                onClick={handleCancelEdit}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.mainContainerCard}>
                    {notes.map((note) => (
                        <Card key={note.id} style={{ marginBottom: 10, backgroundColor: '#0000001f' }}>
                            <CardContent>
                                <Typography variant="h5">{note.title}</Typography>
                                <Typography>{note.content}</Typography>
                                <IconButton onClick={() => handleEditNote(note)}>
                                    <EditIcon color="secondary" />
                                </IconButton>
                                <IconButton onClick={() => handleOpenDialogConfirm(note.id)}>
                                    <DeleteIcon color="success" />
                                </IconButton>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <DialogComponent
                open={open}
                onClose={() => onclose(false)}
                title={'Confirmation'}
                children={"Do you want to delete the note?"}
                actions={
                    <>
                        <ButtonComponent
                            id="acceptDelete"
                            title={"Accept"}
                            variant="contained"
                            color="secondary"
                            size="medium"
                            onClick={() => handleDeleteNote(noteId)}
                        />
                        <ButtonComponent
                            id="cancelDelete"
                            title="Cancel"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            onClick={() => setopen(false)}
                        />
                    </>
                }
            />
            <AlertComponent
                open={infoAlert.openAlert}
                onClose={() => setinfoAlert({ openAlert: false })}
                time={2000}
                title={infoAlert.title}
                severity={infoAlert.severity}
            />
        </div>
    );
};