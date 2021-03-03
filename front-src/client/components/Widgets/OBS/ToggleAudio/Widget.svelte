<script>
  import obs from "@/api/obs";
  import { onMount } from "svelte";
  import { _ } from "@/libs/i18next";
  import actions from "@/api/actions";
  import MdVolumeUp from "svelte-icons/md/MdVolumeUp.svelte";
  import MdVolumeOff from "svelte-icons/md/MdVolumeOff.svelte";
  import WidgetWrapper from "@/components/Widgets/OBS/WidgetWrapper.svelte";

  export let widget;

  let state = { volume: 0.5, muted: false };

  $: source = widget.component.props.source;
  $: icon = !state.muted ? MdVolumeUp : MdVolumeOff;

  $: if (source) getVolume();

  function getVolume() {
    obs.emit("GetVolume", { source }).then((result) => (state = result));
  }

  function onClick() {
    actions.push({ type: "obs", widget }).catch((error) => {
      console.log(">>>Error:", error);
    });
  }

  onMount(async () => {
    obs.on(`connected`, () => {
      getVolume();
    });

    obs.on(`source.volume`, ({ sourceName, volume }) => {
      if (sourceName === source) {
        state.volume = volume;
      }
    });

    obs.on(`source.muted`, ({ sourceName, muted }) => {
      if (sourceName === source) {
        state.muted = muted;
      }
    });
  });
</script>

<WidgetWrapper widget="{widget}" on:click="{onClick}">
  <div class="flex flex-col h-full text-center">
    {#if source}
      <div
        class="flex flex-col w-full h-full {state.muted ? 'text-red-600' : ''}"
      >
        <div class="p-2 break-words">{source}</div>
        <svelte:component this="{icon}" />
      </div>
    {:else}
      <div class="p-2 bg-red-600">{_('obs.no-source-selected')}</div>
    {/if}
  </div>
</WidgetWrapper>
