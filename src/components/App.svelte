<script>
  import { setContext, onMount } from "svelte";
  import feather from "feather-icons";
  import { fetchNotes, store } from "../database";
  import { key } from "../context/notes";
  import NoteList from "./NoteList.svelte";
  import Editor from "./Editor.svelte";
  import ControlBar from "./ControlBar.svelte";

  setContext(key, {
    setSelectedNote: (id) =>
      (selectedNote = notes.find((note) => note._id === id)),
  });

  onMount(() => {
    feather.replace();

    store.subscribe((allNotes) => {
      console.log("upodate");
      notes = allNotes;
      selectedNote = notes[0];
    });

    fetchNotes();
  });

  let notes = [];
  let selectedNote;
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

<main>
  <ControlBar note={selectedNote} {notes} />
  <section class="content">
    <NoteList {notes} {selectedNote} />
    <Editor note={selectedNote} />
  </section>
</main>
