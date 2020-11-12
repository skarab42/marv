<script>
  import { getContext } from "svelte";
  import Panel from "./Panel.svelte";
  import Input from "./Input.svelte";
  import AttrsPanel from "./Panels/Attrs.svelte";
  import StylePanel from "./Panels/Style.svelte";
  import TransPanel from "./Panels/Trans.svelte";

  const { items, selectedItem, selectedKeyframe } = getContext("Editor");

  $: trans = $selectedKeyframe ? Object.entries($selectedKeyframe.trans) : [];
  $: attrs = $selectedKeyframe ? Object.entries($selectedKeyframe.attrs) : [];
  $: style = $selectedKeyframe ? Object.entries($selectedKeyframe.style) : [];
  $: isAudio = $selectedItem.target.type === "audio";
  $: isVideo = $selectedItem.target.type === "video";
  $: hasAttrs = isAudio || isVideo;
  $: hasStyle = !isAudio;
  $: hasTrans = !isAudio;

  function onKeyframeChange(key, { target }) {
    $selectedKeyframe[key] = parseInt(target.value);
    $items = $items;
  }

  function onChange(type, { detail }) {
    const { key, value } = detail;
    // TODO check value, min, max, etc...
    $selectedKeyframe[type][key] = value;
    $items = $items;
  }

  function onRemove(type, { detail }) {
    const { key } = detail;
    delete $selectedKeyframe[type][key];
    $selectedKeyframe = $selectedKeyframe;
    $selectedItem = $selectedItem;
    $items = $items;
  }
</script>

{#if $selectedKeyframe}
<Panel title="Timming">
  <Input
    type="number"
    label="delay"
    min={0} step={100}
    value={$selectedKeyframe.delay}
    on:change={onKeyframeChange.bind(null, "delay")} />
  <Input
    type="number"
    label="duration"
    min={0} step={100}
    value={$selectedKeyframe.duration}
    on:change={onKeyframeChange.bind(null, "duration")} />
</Panel>

<AttrsPanel {attrs}
  visible={hasAttrs}
  on:change={onChange.bind(null, "attrs")}
  on:remove={onRemove.bind(null, "attrs")} />
<StylePanel {style} visible={hasStyle}
  on:change={onChange.bind(null, "style")}
  on:remove={onRemove.bind(null, "style")} />
<TransPanel {trans}
  visible={hasTrans}
  on:change={onChange.bind(null, "trans")}
  on:remove={onRemove.bind(null, "trans")} />
{/if}
