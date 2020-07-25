<script>
  import Quill from "quill";
  import App from "./App.svelte";
  import debounce from "lodash/debounce";
  import { onMount, afterUpdate } from "svelte";
  import { updateNote } from "../database";

  export let note;
  let editor;
  let quill;
  let prevNote = {
    _id: null,
  };

  onMount(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline"],
      [{ list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ];

    quill = new Quill(editor, {
      theme: "bubble",
      bounds: document.body,
      modules: {
        toolbar: toolbarOptions,
      },
    });

    const handleTextChange = debounce((delta, oldDelta, source) => {
      if (source === "user") {
        const contents = quill.getContents();
        const text = quill.getText();
        updateNote(note._id, contents, text);
      }
    }, 20);

    quill.on("text-change", handleTextChange);
  });

  afterUpdate(() => {
    if (!note) {
      quill.setContents("");
      return;
    }

    if (note && note._id !== prevNote._id) {
      quill.setContents(note.delta);
      prevNote = note;
    }
  });
</script>

<style>
  .editor-container {
    border: none;
    height: 100%;
    outline: none;
    position: relative;
    width: 100%;
  }

  .editor-container:focus {
    border: none;
  }
</style>

<div class="editor-container">
  <div bind:this={editor} class="editor" />
</div>
