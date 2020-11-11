<script>
  import api from "@/api/obs";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget;

  $: scene = widget.component.props.scene;

  function selected(scene2) {
    return scene === scene2 ? "bg-blue-600 bg-opacity-25" : "";
  }

  function onClick() {
    api.emit("SetCurrentScene", { "scene-name": scene });
  }
</script>

<WidgetWrapper widget="{widget}" on:click="{onClick}" class="cursor-pointer">
  <div
    class="flex justify-center items-center h-full {selected($state.currentScene)}"
  >
    <div class="p-auto">
      <div class="p-4">{scene}</div>
    </div>
  </div>
</WidgetWrapper>
