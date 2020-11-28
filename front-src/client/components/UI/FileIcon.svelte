<script>
  import Icon from "./Icon.svelte";

  import MdImage from "svelte-icons/md/MdImage.svelte";
  import MdBugReport from "svelte-icons/md/MdBugReport.svelte";
  import MdMusicVideo from "svelte-icons/md/MdMusicVideo.svelte";
  import MdDescription from "svelte-icons/md/MdDescription.svelte";
  import MdFontDownload from "svelte-icons/md/MdFontDownload.svelte";
  import MdOndemandVideo from "svelte-icons/md/MdOndemandVideo.svelte";

  export let type;
  export let defaultIcon = MdBugReport;

  const icons = {
    audio: MdMusicVideo,
    image: MdImage,
    video: MdOndemandVideo,
    text: MdDescription,
    font: MdFontDownload,
  };

  let icon = icons[type] || defaultIcon;
</script>

<Icon icon="{icon}" {...$$restProps} on:click />
