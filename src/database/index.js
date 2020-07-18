import PouchDB from "pouchdb";
import { writable, get } from "svelte/store";

const db = new PouchDB("notes");
const store = writable([]);

async function createNote() {
  try {
    const _id = String(new Date().getTime());
    const newNote = { _id, text: _id, updatedAt: new Date() };
    const response = await db.post(newNote);

    if (response.ok) {
      const notes = get(store);
      store.set([newNote, ...notes]);
    }
  } catch (error) {
    throw error;
  }
}

async function fetchNotes() {
  try {
    const result = await db.allDocs({ include_docs: true });
    const docs = result.rows.reduce((acc, val) => {
      acc.push(val.doc);
      return acc;
    }, []);

    docs.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    store.set(docs);
  } catch (error) {
    console.error(error);
  }
}

async function deleteNote(id) {
  try {
    const doc = await db.get(id);
    const response = await db.remove(doc);

    if (response.ok) {
      const notes = get(store);
      const filteredNotes = notes.filter((doc) => doc._id !== id);
      store.set(filteredNotes);
    }
  } catch (error) {
    console.error(error);
  }
}

export { db, createNote, fetchNotes, deleteNote, store };
