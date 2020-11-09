<script>
  import api from "@/api/obs";
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";

  $: scenes = $state.scenes || [];

  function selected(scene) {
    return scene.name === $state.currentScene ? "bg-black bg-opacity-25" : "";
  }

  function onSelect(scene) {
    api.emit("SetCurrentScene", { "scene-name": scene.name });
  }
</script>

<div class="relative h-full">
  {#each scenes as scene}
    <div
      class="p-2 {selected(scene)} cursor-pointer hover:bg-blue-200 hover:bg-opacity-50"
      on:click="{onSelect.bind(null, scene)}"
    >
      {scene.name}
    </div>
  {/each}
  {#if !$state.connected}
    <div class="absolute inset-0 bg-black bg-opacity-75">
      <div class="flex justify-center items-center h-full">
        <div
          class="p-auto transform -rotate-45 p-2 bg-red-600 opacity-75 rounded shadow"
        >
          <span>{_('sentences.obs-not-connected')}</span>
        </div>
      </div>
    </div>
  {/if}
</div>
