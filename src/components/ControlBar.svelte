<script>
  import { getContext, onMount } from "svelte";
  import debounce from "lodash/debounce";
  import { createNote, deleteNote, searchNotes, fetchNotes } from "../database";
  import { key } from "../context/notes";

  export let note;
  export let notes;
  let searchInput;
  const { setSelectedNote, getQuill } = getContext(key);

  const search = debounce(async (text) => {
    await searchNotes(text);

    if (notes.length) {
      setSelectedNote(notes[0]._id);
    } else {
      setSelectedNote(null);
    }
  }, 300);

  function handleSearch(event) {
    if (notes[0] && !notes[0].text) {
      deleteNote(notes[0]._id);
    }

    search(event.target.value);
  }

  async function createNewNote() {
    if (!notes.length || (notes[0] && notes[0].text)) {
      searchInput.value = "";
      try {
        await fetchNotes();
        const id = await createNote();
        setSelectedNote(id);
        getQuill().focus();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const deleteCurrentNote = async () => {
    if (note) {
      await deleteNote(note._id);

      if (notes[0]) {
        setSelectedNote(notes[0]._id);
      } else {
        setSelectedNote(null);
      }
    }
  };
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
      on:click={deleteCurrentNote}>
      <i data-feather="trash-2" />
    </button>
  </div>
</section>
