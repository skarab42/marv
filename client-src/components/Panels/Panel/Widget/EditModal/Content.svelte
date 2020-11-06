<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import Input from "@/components/UI/Input.svelte";
  import Select from "@/components/UI/Select.svelte";
  import ColorPicker from "@/components/UI/ColorPicker.svelte";

  export let panel;
  export let widget;

  let labelWord = _("words.label");

  function val(source, key, defaultValue) {
    return (source && source[key]) || defaultValue;
  }

  $: component = widget.component;
  $: labelPlaceholder = val(component, "label", "OBS | Alerts | Media");

  function update(key, value) {
    widget[key] = value;
    api.update(panel);
  }

  function onUpdate(key, { detail: value }) {
    update(key, value);
  }

  function onBackgroundColor({ detail: color }) {
    update("backgroundColor", color.hex);
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
    items="{['left', 'center', 'right']}"
    on:change="{onUpdate.bind(null, 'labelAlign')}"
  />

  <ColorPicker
    label="{_('sentences.background-color')}"
    on:color="{onBackgroundColor}"
    color="{widget.backgroundColor}"
  />
</div>
