<script>
  import api from "@/api/obs";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget;

  let selectedClass = "bg-black bg-opacity-25";

  $: scene1 = widget.component.props.scene1;
  $: scene2 = widget.component.props.scene2;

  $: scene1Class = scene1 === $state.currentScene ? selectedClass : "";
  $: scene2Class = scene2 === $state.currentScene ? selectedClass : "";

  function onClick() {
    if ($state.currentScene === scene1) {
      api.emit("SetCurrentScene", { "scene-name": scene2 });
    } else {
      api.emit("SetCurrentScene", { "scene-name": scene1 });
    }
  }
</script>

<WidgetWrapper on:click="{onClick}" class="cursor-pointer">
  <div class="flex justify-center items-center h-full">
    <div class="p-auto">
      <div class="p-4 {scene1Class}">{scene1}</div>
      <div class="p-4 {scene2Class}">{scene2}</div>
    </div>
  </div>
</WidgetWrapper>
