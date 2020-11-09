<script>
  import api from "@/api/obs";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  $: scenes = $state.scenes || [];

  function selected(scene) {
    return scene.name === $state.currentScene ? "bg-black bg-opacity-25" : "";
  }

  function onSelect(scene) {
    api.emit("SetCurrentScene", { "scene-name": scene.name });
  }
</script>

<WidgetWrapper>
  {#each scenes as scene}
    <div
      class="p-2 {selected(scene)} cursor-pointer hover:bg-blue-200 hover:bg-opacity-50"
      on:click="{onSelect.bind(null, scene)}"
    >
      {scene.name}
    </div>
  {/each}
</WidgetWrapper>
