'use client';
import { useState, useEffect } from "react";
import styles from './page.module.css'; // CSS Modulunu daxil edirik

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Notes-u API-dən çəkmək
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content };

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    if (response.ok) {
      const addedNote = await response.json();
      setNotes([...notes, addedNote]);
      setTitle("");
      setContent("");
    } else {
      console.error("Error adding note");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" className={styles.button}>Add Note</button>
      </form>
    </div>
  );
}
