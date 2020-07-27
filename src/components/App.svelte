<script>
  import { setContext, onMount } from "svelte";
  import feather from "feather-icons";
  import { fetchNotes, store } from "../database";
  import { key } from "../context/notes";
  import NoteList from "./NoteList.svelte";
  import Editor from "./Editor.svelte";
  import ControlBar from "./ControlBar.svelte";

  let notes = [];
  let isNavigating = false;
  let selectedNote;
  let quill;

  const handleWindowClick = () => {
    isNavigating = false;
  };

  setContext(key, {
    setQuill: (instance) => {
      quill = instance;
    },
    getQuill: () => quill,
    getIsNavigating: () => isNavigating,
    setSelectedNote: (id) => {
      selectedNote = notes.find((note) => note._id === id);
    },
    setIsNavigating: (value) => {
      isNavigating = value;
    },
  });

  onMount(() => {
    feather.replace();

    store.subscribe((allNotes) => {
      notes = allNotes;

      if (!selectedNote) {
        selectedNote = notes[0];
      }
    });

    fetchNotes();
  });
</script>

<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.bubble.css";

  main {
    height: 100%;
  }

  .content {
    display: flex;
    height: calc(100vh - 60px);
    overflow: hidden;
  }
</style>

<svelte:window on:click={handleWindowClick} />

<main>
  <ControlBar note={selectedNote} {notes} {quill} />
  <section class="content">
    <NoteList {notes} {selectedNote} {isNavigating} />
    <Editor note={selectedNote} {notes} {quill} />
  </section>
</main>
