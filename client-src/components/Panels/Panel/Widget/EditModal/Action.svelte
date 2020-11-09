<script>
  import { _ } from "@/libs/i18next";
  import Select from "@/components/UI/Select.svelte";

  export let panel;
  export let widget;

  let widgetsList = [
    { key: "OBS | Scene List", val: "obs.SceneList" },
    { key: "OBS | Toggle Scene", val: "obs.ToggleScene" },
    { key: "OBS | Switch Scene", val: "obs.SwitchList" },
  ];

  $: console.log({ panel, widget });

  $: component = widget.component;
  $: componentLabel = (component && component.label) || "";

  function onComponentChange({ detail: label }) {
    console.log({ label });
  }
</script>

<div class="p-2 space-y-2 flex flex-col">
  <Select
    object="{true}"
    label="{_('words.component')}"
    value="{componentLabel}"
    items="{widgetsList}"
    on:change="{onComponentChange}"
  />
</div>
