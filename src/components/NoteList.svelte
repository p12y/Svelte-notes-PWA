<script>
  import { getContext, onMount } from "svelte";
  import { key } from "../context/notes";
  import {
    deleteNote,
    DEFAULT_TITLE,
    DEFAULT_ADDITIONAL_TEXT,
  } from "../database";
  export let notes;
  export let selectedNote;

  function deleteEmptyNewNote() {
    if (notes[0] && !notes[0].text) {
      deleteNote(notes[0]._id);
    }
  }

  const { setSelectedNote } = getContext(key);

  const handleLinkClick = (id) => (event) => {
    event.preventDefault();

    if (selectedNote._id === id) {
      return;
    }

    deleteEmptyNewNote();
    setSelectedNote(id);
  };

  const getText = (note, type) => {
    if (type === "title" || type === "additionalText") {
      const defaultText = {
        title: DEFAULT_TITLE,
        additionalText: DEFAULT_ADDITIONAL_TEXT,
      };

      return note.highlighting && note.highlighting[type]
        ? note.highlighting[type]
        : (note[type] && note[type].trim()) || defaultText[type];
    }

    throw new Error("Incorrect type");
  };

  onMount(() => {
    const keydownListener = document.addEventListener("keydown", (event) => {
      let nextIndex = 0;
      const currIndex = notes.findIndex(
        (note) => selectedNote._id === note._id
      );
      const setNextActiveNote = () => {
        if (notes.length < 2) {
          return;
        }

        if (event.key === "ArrowDown") {
          nextIndex = currIndex + 1 < notes.length ? currIndex + 1 : 0;
          setSelectedNote(notes[nextIndex]._id);
          deleteEmptyNewNote();
        } else if (event.key === "ArrowUp") {
          nextIndex = currIndex - 1 >= 0 ? currIndex - 1 : notes.length - 1;
          setSelectedNote(notes[nextIndex]._id);
          deleteEmptyNewNote();
        }
      };

      if (
        document.activeElement.classList.contains("link") &&
        /ArrowUp|ArrowDown/.test(event.key)
      ) {
        event.preventDefault();
        setNextActiveNote();
      }
    });

    return () => document.removeEventListener("keydown", keydownListener);
  });
</script>

<style>
  .note-list {
    border-right: 1px solid var(--border-color);
    height: 100%;
    min-width: 350px;
    overflow: auto;
    width: 350px;
  }

  li {
    border-bottom: 1px solid var(--border-color);
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .title {
    margin: 0;
  }

  .body {
    margin: 0;
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a.link {
    display: block;
    padding: 1rem;
    color: #606c76;
  }

  .note-link {
    transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .note-link.active {
    background: hsla(277, 54%, 55%, 0.08);
  }

  @media only screen and (max-width: 650px) {
    .note-list {
      min-width: 150px;
      width: 150px;
    }
  }
</style>

<section class="note-list">
  <ul>
    {#each notes as note}
      <li class="note-link" class:active={note === selectedNote}>
        <a
          href="/"
          class="link"
          class:active={note === selectedNote}
          on:click={handleLinkClick(note._id)}>
          <h5 class="title truncate">
            {@html getText(note, 'title')}
          </h5>
          <p class="body truncate">
            {@html getText(note, 'additionalText')}
          </p>
        </a>
      </li>
    {/each}
  </ul>
</section>
