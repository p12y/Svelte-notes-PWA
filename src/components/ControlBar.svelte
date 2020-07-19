<script>
  import { getContext, onMount } from "svelte";
  import { createNote, deleteNote } from "../database";

  export let note;
  export let notes;
</script>

<style>
  .control-bar {
    border-bottom: 1px solid var(--border-color);
    display: flex;
    width: 100%;
  }

  .searchbar {
    margin: 0 15px 0 0;
  }

  .controls {
    align-items: center;
    display: flex;
    height: 100%;
    padding: 15px;
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
</style>

<section class="control-bar">
  <div class="controls main-controls">
    <input class="searchbar" type="text" placeholder="Search" id="search" />
    <button
      class="button button-clear btn-new-note"
      on:click={() => {
        if (!notes.length) {
          createNote();
        } else if (notes[0] && notes[0].text) {
          createNote();
        }
      }}
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
