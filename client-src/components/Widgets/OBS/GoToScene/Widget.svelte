<script>
  import api from "@/api/obs";
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget;

  let selectedClass = "bg-black opacity-50";

  $: scene = widget.component.props.scene;

  function selected(scene2) {
    return scene === scene2 ? selectedClass : "";
  }

  function onClick() {
    scene && api.emit("SetCurrentScene", { "scene-name": scene });
  }

  $: cls = scene ? "cursor-pointer" : "cursor-not-allowed";
</script>

<WidgetWrapper widget="{widget}" on:click="{onClick}" class="{cls}">
  <div class="flex flex-col h-full text-center">
    {#if scene}
      <div class="p-2 break-words {selected($state.currentScene)}">{scene}</div>
    {:else}
      <div class="p-2 bg-red-600">{_('obs.no-scene-selected')}</div>
    {/if}
  </div>
</WidgetWrapper>
