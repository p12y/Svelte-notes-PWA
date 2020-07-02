<style>
  .control-bar {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    display: flex;
  }

  .searchbar {
    margin: 0;
    margin-right: 15px;
  }

  .controls {
    display: flex;
    align-items: center;
    padding: 15px;
    height: 100%;
  }

  .main-controls {
    width: 350px;
    min-width: 350px;
    border-right: 1px solid var(--border-color);
  }

  .note-controls {
    flex: 1 1 auto;
    justify-content: flex-end;
  }

  .btn-new-note {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<section class="control-bar">
  <div class="controls main-controls">
    <input class="searchbar" type="text" placeholder="Search" id="search" />
    <button class="button button-clear btn-new-note">
      <i data-feather="file-plus" />
    </button>
  </div>
  <div class="controls note-controls">
    <button class="button button-clear btn-new-note">
      <i data-feather="trash-2" />
    </button>
  </div>
</section>
