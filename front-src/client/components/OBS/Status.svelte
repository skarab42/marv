<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";

  let fps = "0";
  let cpu = "0";
  let mem = "0";

  let off = _("words.off");

  let md = "hidden sm:block";
  let badge = "px-2 bg-primary-dark text-light-darker rounded";

  function timecode(type) {
    const timecode = $state.status[`${type}-timecode`];
    return (timecode && timecode.split(".")[0]) || off;
  }

  function label({ connected, connecting }) {
    if (connected) {
      return _("words.connected");
    } else if (connecting) {
      return `${_("sentences.waiting-for-connexion")}...`;
    } else {
      return _("words.disconnected");
    }
  }

  $: if ($state.streaming && $state.status["fps"]) {
    fps = parseInt($state.status["fps"]);
    mem = parseInt($state.status["memory-usage"]);
    cpu = parseFloat($state.status["cpu-usage"]).toFixed(1);
  }

  $: streamingTimecode = $state.streaming ? timecode("stream") : off;
  $: recordingTimecode = $state.recording ? timecode("rec") : off;
</script>

<div class="flex p-2 pl-0 space-x-2">
  {#if !$state.connected}
    <div class="truncate">
      <span>OBS</span>
      <span class="lowercase">{label($state)}</span>
    </div>
  {/if}

  {#if $state.connected}
    <div class="{badge}">{_('words.recording')} {recordingTimecode}</div>
    <div class="{badge}">{_('words.live')} {streamingTimecode}</div>
  {/if}

  {#if $state.connected && $state.streaming}
    <div class="{badge} {md}">FPS {fps}</div>
    <div class="{badge} {md}">
      MEM
      <span class="inline-block">{mem} MB</span>
    </div>
    <div class="{badge} {md}">
      CPU
      <span class="inline-block">{cpu} %</span>
    </div>
  {/if}
</div>
