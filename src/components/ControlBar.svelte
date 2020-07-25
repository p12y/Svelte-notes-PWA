<script>
  import { getContext, onMount } from "svelte";
  import { createNote, deleteNote, searchNotes, fetchNotes } from "../database";

  export let note;
  export let notes;
  let searchInput;

  function handleSearch(event) {
    if (notes[0] && !notes[0].text) {
      deleteNote(notes[0]._id);
    }
    searchNotes(event.target.value);
  }

  function createNewNote() {
    if (!notes.length || (notes[0] && notes[0].text)) {
      searchInput.value = "";
      fetchNotes();
      createNote();
    }
  }
</script>

<style>
  .control-bar {
    border-bottom: 1px solid var(--border-color);
    display: flex;
    width: 100%;
  }

  .searchbar {
    margin: 0 10px 0 0;
  }

  .controls {
    align-items: center;
    display: flex;
    height: 60px;
    padding: 10px;
  }

  .main-controls {
    border-right: 1px solid var(--border-color);
    min-width: 350px;
    width: 350px;
  }

  .note-controls {
    flex: 1 1 auto;
    justify-content: flex-end;
  }

  .btn-new-note {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  @media only screen and (max-width: 650px) {
    .main-controls {
      min-width: 150px;
      width: 150px;
    }
  }
</style>

<section class="control-bar">
  <div class="controls main-controls">
    <input
      bind:this={searchInput}
      class="searchbar"
      type="text"
      placeholder="Search"
      id="search"
      on:input={handleSearch} />
    <button
      class="button button-clear btn-new-note"
      on:click={createNewNote}
      disabled={notes[0] && !notes[0].text}>
      <i data-feather="file-plus" />
    </button>
  </div>
  <div class="controls note-controls">
    <button
      class="button button-clear btn-new-note"
      disabled={Boolean(!notes.length)}
      on:click={() => note && deleteNote(note._id)}>
      <i data-feather="trash-2" />
    </button>
  </div>
</section>
