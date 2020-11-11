<script>
  import api from "@/api/obs";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget = null;

  $: scenes = $state.scenes || [];

  let selectedClass = "bg-black opacity-50";

  function selected(scene) {
    return scene.name === $state.currentScene ? selectedClass : "";
  }

  function onSelect(scene) {
    api.emit("SetCurrentScene", { "scene-name": scene.name });
  }
</script>

<WidgetWrapper widget="{widget}">
  <div data-simplebar class="h-full">
    {#each scenes as scene}
      <div
        id="{widget.id}"
        class="p-2 {selected(scene)} cursor-pointer hover:bg-blue-200 hover:bg-opacity-50"
        on:click="{onSelect.bind(null, scene)}"
      >
        {scene.name}
      </div>
    {/each}
  </div>
</WidgetWrapper>
