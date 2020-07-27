<script>
  import Quill from "quill";
  import debounce from "lodash/debounce";
  import { onMount, afterUpdate, getContext } from "svelte";
  import { updateNote } from "../database";
  import { key } from "../context/notes";

  export let note;
  export let notes;
  let editor;
  let quill;
  let prevId;

  const { setSelectedNote, setQuill } = getContext(key);

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ];

  onMount(() => {
    quill = new Quill(editor, {
      theme: "bubble",
      bounds: document.body,
      modules: {
        toolbar: toolbarOptions,
      },
    });

    setQuill(quill);

    const handleTextChange = debounce(async (delta, oldDelta, source) => {
      if (!note) return;

      if (source === "user") {
        const contents = quill.getContents();
        const text = quill.getText();
        await updateNote(note._id, contents, text);
        setSelectedNote(notes[0]._id);
      }
    }, 20);

    quill.on("text-change", handleTextChange);
  });

  afterUpdate(() => {
    if (!note) {
      quill.setContents("");
      prevId = null;
      return;
    }

    if (note._id !== prevId) {
      quill.setContents(note.delta);
      prevId = note._id;
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
