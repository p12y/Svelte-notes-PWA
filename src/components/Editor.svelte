<script>
  export let note;
</script>

<style>
  .editor {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2rem;
    outline: none;
    border: none;
  }

  .editor:focus {
    border: none;
  }
</style>

<textarea class="editor" contenteditable="true" value={note.text} />
