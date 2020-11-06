<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Input from "@/components/UI/Input.svelte";
  import Select from "@/components/UI/Select.svelte";

  export let panel;
  export let widget;

  // $: console.log(widget);

  let component;
  let labelPlaceholder;

  let labelWord = _("words.label");

  function val(source, key, defaultValue) {
    return (source && source[key]) || defaultValue;
  }

  $: component = widget.component;
  $: labelPlaceholder = val(component, "label", "OBS | Alerts | Media");

  function onUpdate(key, { detail: value }) {
    widget[key] = value;
    api.update(panel);
  }
</script>

<div class="p-2 space-y-2 flex flex-col">
  <Input
    label="{labelWord}"
    value="{widget.label}"
    placeholder="{labelPlaceholder}"
    on:update="{onUpdate.bind(null, 'label')}"
  />
  <Input
    type="number"
    label="{labelWord} | {_('words.size')}"
    value="{widget.labelSize}"
    on:update="{onUpdate.bind(null, 'labelSize')}"
  />
  <Input
    type="number"
    label="{labelWord} | {_('words.padding')}"
    value="{widget.labelPadding}"
    on:update="{onUpdate.bind(null, 'labelPadding')}"
  />
  <Select
    label="{labelWord} | {_('words.align')}"
    value="{widget.labelAlign}"
    items="{['left', 'center', 'top']}"
    on:change="{onUpdate.bind(null, 'labelAlign')}"
  />
</div>
