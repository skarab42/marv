<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import { push } from "@/libs/actions";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget;

  let selectedClass = "bg-black opacity-50";

  $: scene1 = widget.component.props.scene1;
  $: scene2 = widget.component.props.scene2;

  $: scene1Class = scene1 === $state.currentScene ? selectedClass : "";
  $: scene2Class = scene2 === $state.currentScene ? selectedClass : "";

  $: hasScenes = scene1 && scene2;
  $: cls = hasScenes ? "cursor-pointer" : "cursor-not-allowed";

  function triggerAction() {
    push({ type: "obs", widget }).catch((error) => {
      console.log(">>>Error:", error);
    });
  }

  function onClick() {
    if (hasScenes) triggerAction();
  }
</script>

<WidgetWrapper widget="{widget}" on:click="{onClick}" class="{cls}">
  <div class="flex flex-col h-full text-center">
    {#if hasScenes}
      <div class="p-2 break-words {scene1Class}">{scene1}</div>
      <div class="p-2 break-words {scene2Class}">{scene2}</div>
    {:else}
      <div class="p-2 bg-red-600">{_('obs.no-scene-selected')}</div>
    {/if}
  </div>
</WidgetWrapper>
