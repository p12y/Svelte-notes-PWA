<script>
  import { setContext, onMount } from "svelte";
  import feather from "feather-icons";
  import { key } from "../context/notes";
  import NoteList from "./NoteList.svelte";
  import Editor from "./Editor.svelte";
  import ControlBar from "./ControlBar.svelte";

  setContext(key, {
    getNotes: () => notes,
    setSelectedNote: (id) =>
      (selectedNote = notes.find((note) => note.id === id)),
  });

  onMount(() => {
    feather.replace();
  });

  let notes = [
    { id: 1, text: "Note 1\nThis is note 1" },
    { id: 2, text: "Note 2\nThis is note 2" },
    { id: 3, text: "Note 3\nThis is note 3" },
    { id: 4, text: "Note 4\nThis is note 4" },
    { id: 5, text: "Note 5\nThis is note 5" },
  ];

  let selectedNote = notes[0];
</script>

<style>
  main {
    height: 100%;
  }

  .content {
    height: 100%;
    display: flex;
  }
</style>

<main>
  <ControlBar />
  <section class="content">
    <NoteList {notes} {selectedNote} />
    <Editor note={selectedNote} />
  </section>
</main>
