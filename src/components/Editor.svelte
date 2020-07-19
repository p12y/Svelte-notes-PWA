<script>
  import App from "./App.svelte";

  import { onMount } from "svelte";
  import { updateNote } from "../database";

  export let note;
  let field;

  const handleKeyDown = (event) => {
    if (!note) return;
    updateNote(note._id, field.value);
  };

  onMount(() => {
    field.addEventListener("input", handleKeyDown);
  });
</script>

<style>
  .editor {
    border: none;
    height: 100%;
    outline: none;
    padding: 2rem;
    position: relative;
    width: 100%;
  }

  .editor:focus {
    border: none;
  }
</style>

<textarea
  bind:this={field}
  class="editor"
  contenteditable="true"
  value={note ? note.text : ''} />
