import PouchDB from "pouchdb";
import QuickSearch from "pouchdb-quick-search";
import { writable, get } from "svelte/store";
import debounce from "lodash/debounce";

PouchDB.plugin(QuickSearch);

const db = new PouchDB("notes");
const store = writable([]);

async function createNote() {
  try {
    const _id = String(new Date().getTime());
    const newNote = { _id, text: "", updatedAt: new Date() };
    const response = await db.post(newNote);

    if (response.ok) {
      const notes = get(store);
      store.set([newNote, ...notes]);
    }
  } catch (error) {
    throw error;
  }
}

async function updateNote(id, text) {
  try {
    const doc = await db.get(id);
    const updatedNote = {
      text,
      _id: id,
      _rev: doc._rev,
      updatedAt: new Date(),
    };
    const response = await db.put(updatedNote);
    const notes = get(store).filter((note) => note._id !== id);
    store.set([updatedNote, ...notes]);
  } catch (error) {
    console.error(error);
  }
}

function setNotes(response) {
  const docs = response.rows.reduce((acc, { doc, highlighting }) => {
    acc.push({ highlighting, ...doc });
    return acc;
  }, []);

  docs.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  store.set(docs);
}

async function fetchNotes() {
  try {
    const response = await db.allDocs({ include_docs: true });
    setNotes(response);
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

const searchNotes = debounce(async (text) => {
  const query = text.trim();

  if (!query) {
    fetchNotes();
  }

  try {
    const result = await db.search({
      query: text,
      fields: ["text"],
      include_docs: true,
      highlighting: true,
    });

    setNotes(result);
  } catch (error) {
    console.error(error);
  }
}, 300);

export {
  db,
  store,
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
  searchNotes,
};
