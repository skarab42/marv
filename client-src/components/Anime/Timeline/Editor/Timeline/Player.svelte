<script>
  import Icon from "@/components/UI/Icon.svelte";
  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdReplay from "svelte-icons/md/MdReplay.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdSkipPrevious from "svelte-icons/md/MdSkipPrevious.svelte";

  import { getContext } from "svelte";
  const { seek } = getContext("Editor");

  export let anime = null;

  function playAnime() {
    anime && anime.play();
  }

  function restartAnime() {
    anime && anime.restart();
  }

  function pauseAnime() {
    anime && anime.pause();
  }

  function resetAnime() {
    $seek = 0;
    anime && anime.reset();
  }

  $: color = anime ? "text-green-500 hover:text-blue-500" : "text-primary-darker";
  $: iconClass = `${color} w-4 h-4 flex-shrink-0 cursor-pointer`;
</script>

<Icon class={iconClass} icon={MdReplay} on:click={restartAnime} />
<Icon class={iconClass} icon={MdSkipPrevious} on:click={resetAnime} />
<Icon class={iconClass} icon={MdPlayArrow} on:click={playAnime} />
<Icon class={iconClass} icon={MdPause} on:click={pauseAnime} />
