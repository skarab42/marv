<script>
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Section from "./Settings/Section.svelte";
  import InfoPanel from "./Settings/Panels/Info.svelte";
  import AttrsPanel from "./Settings/Panels/Attrs.svelte";
  import StylePanel from "./Settings/Panels/Style.svelte";
  import TransPanel from "./Settings/Panels/Trans.svelte";
  import Keyframe from "./Settings/Keyframe.svelte";

  import Icon from "@/components/UI/Icon.svelte";
  import MdAdjust from "svelte-icons/md/MdAdjust.svelte";

  const { items, selectedItem, selectedKeyframe } = getContext("Editor");

  $: info = $selectedItem ? Object.entries($selectedItem.target.info) : [];
  $: attrs = $selectedItem ? Object.entries($selectedItem.target.attrs) : [];
  $: style = $selectedItem ? Object.entries($selectedItem.target.style) : [];
  $: trans = $selectedItem ? Object.entries($selectedItem.target.trans) : [];
  $: isAudio = $selectedItem && $selectedItem.target.type === "audio";
  $: isVideo = $selectedItem && $selectedItem.target.type === "video";
  $: hasAttrs = isAudio || isVideo;
  $: hasStyle = !isAudio;
  $: hasTrans = !isAudio;

  function onChange(type, { detail }) {
    const { key, value } = detail;
    // TODO check value, min, max, etc...
    $selectedItem.target[type][key] = value;
    $items = $items;
  }

  function onRemove(type, { detail }) {
    const { key } = detail;
    delete $selectedItem.target[type][key];
    $selectedItem = $selectedItem;
    $items = $items;
  }
</script>

{#if $selectedItem}
  <Section>
    <div slot="title" class="flex space-x-2">
      <AnimeIcon type="{$selectedItem.target.type}" />
      <span class="truncate">{$selectedItem.target.name}</span>
    </div>
    <InfoPanel info="{info}" />
    <AttrsPanel
      attrs="{attrs}"
      visible="{hasAttrs}"
      on:change="{onChange.bind(null, 'attrs')}"
      on:remove="{onRemove.bind(null, 'attrs')}"
    />
    <StylePanel
      style="{style}"
      visible="{hasStyle}"
      on:change="{onChange.bind(null, 'style')}"
      on:remove="{onRemove.bind(null, 'style')}"
    />
    <TransPanel
      trans="{trans}"
      visible="{hasTrans}"
      on:change="{onChange.bind(null, 'trans')}"
      on:remove="{onRemove.bind(null, 'trans')}"
    />
  </Section>
  <Section visible="{$selectedKeyframe}">
    <div slot="title" class="flex space-x-2">
      <Icon icon="{MdAdjust}" class="w-4 h-4 flex-shrink-0" />
      <div class="truncate">Keyframe</div>
    </div>
    <!-- <div class="p-2 flex items-center">
      <div class="truncate w-1/2">identifier</div>
      <div class="truncate w-1/2">{$selectedKeyframe.id}</div>
    </div> -->
    <Keyframe />
  </Section>
{:else if $items.length}
  <div class="p-2 truncate bg-primary-dark">No file selected...</div>
{:else}
  <div class="p-2 truncate bg-primary-dark">No files added...</div>
  <div class="p-2">Drop some file on the timeline ;)</div>
{/if}
