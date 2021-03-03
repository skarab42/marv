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

  function db(mul) {
    return (Math.log10(mul) * 20).toFixed(1);
  }

  function sendAction(data) {
    actions.push({ type: "obs", widget, data }).catch((error) => {
      console.log(">>>Error:", error);
    });
  }

  function onToggleAudio() {
    sendAction({ mute: !state.muted });
  }

  function onVolumeChange({ target }) {
    sendAction({ volume: Math.pow(parseFloat(target.value), 3) });
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

<WidgetWrapper widget="{widget}">
  <div class="flex flex-col h-full">
    {#if source}
      <div
        class="flex flex-col w-full h-full {state.muted ? 'text-red-600' : ''}"
      >
        <div class="flex p-2 gap-2">
          <div class="break-words flex-auto">{source}</div>
          <div class="text-right">{db(state.volume)} dB</div>
        </div>
        <div class="flex p-2 gap-2 items-center">
          <input
            type="range"
            min="{0}"
            max="1"
            step="0.01"
            class="flex-auto"
            value="{Math.pow(state.volume, 1 / 3)}"
            on:input="{onVolumeChange}"
          />
          <div class="w-8 h-8 flex-shrink-0" on:click="{onToggleAudio}">
            <svelte:component this="{icon}" />
          </div>
        </div>
      </div>
    {:else}
      <div class="p-2 bg-red-600">{_('obs.no-source-selected')}</div>
    {/if}
  </div>
</WidgetWrapper>
