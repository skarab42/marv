<script>
  import api from "@/api/obs";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget;

  let selectedClass = "bg-black opacity-50";

  $: scene = widget.component.props.scene;

  function selected(scene2) {
    return scene === scene2 ? selectedClass : "";
  }

  function onClick() {
    api.emit("SetCurrentScene", { "scene-name": scene });
  }
</script>

<WidgetWrapper widget="{widget}" on:click="{onClick}" class="cursor-pointer">
  <div class="flex flex-col h-full text-center">
    <div class="p-2 break-words {selected($state.currentScene)}">{scene}</div>
  </div>
</WidgetWrapper>
