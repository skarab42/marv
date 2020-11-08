<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import Icon from "@/components/UI/Icon.svelte";
  import Input from "@/components/UI/Input.svelte";
  import Select from "@/components/UI/Select.svelte";
  import Button from "@/components/UI/Button.svelte";
  import ColorPicker from "@/components/UI/ColorPicker.svelte";
  import FileManager from "@/components/FileManager/Main.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";

  export let panel;
  export let widget;

  let fileManager = false;
  let labelWord = _("words.label");

  function val(source, key, defaultValue = null) {
    return (source && source[key]) || defaultValue;
  }

  $: component = widget.component;
  $: labelPlaceholder = val(component, "label", "OBS | Alerts | Media");
  $: bgImage =
    widget.backgroundImage &&
    `background-image: url(files/${widget.backgroundImage});`;

  function set(key, value) {
    widget[key] = value;
    update(panel);
  }

  function onUpdate(key, { detail: value }) {
    set(key, value);
  }

  function onBackgroundColor({ detail: color }) {
    set("backgroundColor", color.hex);
  }

  function openFileManager() {
    fileManager = true;
  }

  function closeFileManager() {
    fileManager = false;
  }

  function onFileSelect({ detail: file }) {
    closeFileManager();
    set("backgroundImage", file.filename);
  }

  function removeBackgroundImage() {
    set("backgroundImage", null);
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
  <Input
    label="{_('words.borders')}"
    value="{widget.borders}"
    on:update="{onUpdate.bind(null, 'borders')}"
  />
  <ColorPicker
    label="{_('sentences.background-color')}"
    on:color="{onBackgroundColor}"
    color="{widget.backgroundColor}"
  />
  <Button padding="" class="bg-dark-lighter" on:click="{openFileManager}">
    <div class="p-2 text-left flex-auto">{_('sentences.background-image')}</div>
    {#if bgImage}
      <div
        style="{bgImage}"
        class="bg-center w-10 h-10 bg-no-repeat bg-cover"
      ></div>
    {/if}
    <div
      class="flex items-center justify-center bg-red-700 w-10 h-10"
      on:click|stopPropagation="{removeBackgroundImage}"
    >
      <Icon icon="{MdDelete}" />
    </div>
  </Button>
</div>

{#if fileManager}
  <div class="absolute inset-0">
    <div class="relative h-full">
      <FileManager
        accept="{['image']}"
        on:close="{closeFileManager}"
        on:select="{onFileSelect}"
      />
    </div>
  </div>
{/if}
