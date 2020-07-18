<script>
  export let note;
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

<textarea class="editor" contenteditable="true" value={note ? note.text : ''} />
