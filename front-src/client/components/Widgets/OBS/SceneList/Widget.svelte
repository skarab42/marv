<script>
  import api from "@/api/actions";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget = null;

  $: scenes = $state.scenes || [];

  let selectedClass = "bg-black opacity-50";

  function selected(scene) {
    return scene.name === $state.currentScene ? selectedClass : "";
  }

  function onSelect(scene) {
    api
      .push({
        type: "obs",
        widget,
        data: {
          scene: scene.name,
        },
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
</script>

<WidgetWrapper widget="{widget}">
  <div class="h-full overflow-auto">
    <div class="divide-y divide-gray-900 divide-opacity-25">
      {#each scenes as scene}
        <div
          id="{widget.id}"
          class="p-2 {selected(scene)} break-words cursor-pointer hover:bg-black hover:bg-opacity-50"
          on:click="{onSelect.bind(null, scene)}"
        >
          {scene.name}
        </div>
      {/each}
    </div>
  </div>
</WidgetWrapper>
