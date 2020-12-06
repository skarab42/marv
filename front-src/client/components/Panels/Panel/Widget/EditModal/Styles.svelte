<script>
  import borders from "./borders";
  import { _ } from "@/libs/i18next";
  import capitalize from "capitalize";
  import { update } from "@/libs/panels";
  import Icon from "@/components/UI/Icon.svelte";
  import Input from "@/components/UI/Input.svelte";
  import Select from "@/components/UI/Select.svelte";
  import Button from "@/components/UI/Button.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import ColorPicker from "@/components/UI/ColorPicker.svelte";
  import MdDelete from "svelte-icons/md/MdDeleteForever.svelte";
  import FileManager from "@/components/FileManager/Main.svelte";

  export let panel;
  export let widget;

  let fileManager = false;
  let labelWord = _("words.label");

  $: component = widget.component;
  $: labelPlaceholder = component ? _(component.label) : "OBS | Alerts | Media";
  $: bgImage =
    widget.backgroundImage &&
    `background-image: url(files/${widget.backgroundImage});`;

  function _capitalize(val) {
    return { val, key: capitalize(_(`words.${val}`)) };
  }

  let borderPositions = borders.sizes;
  let borderSizes = borders.positions.map((pos) => {
    return { ...pos, key: capitalize(_(`words.${pos.key}`)) };
  });

  let borderSize = borderSizes[0].val;
  let borderPosition = borderPositions[0].val;

  $: selectedBorders = ["rounded", borderSize, borderPosition]
    .filter((tag) => tag.length)
    .join("-");

  let positionItems = ["top", "bottom"].map(_capitalize);
  let alignItems = ["left", "center", "right"].map(_capitalize);

  $: bordersTags = widget.borders.split(" ").filter((tag) => tag.length);

  function formatTag(tag) {
    tag = tag.replace("rounded-", "");

    const [pos, size] = tag.split("-");

    let sizeTag = borders.sizes.find((tag) => [pos, size].includes(tag.val));
    let posTag = borders.positions.find((tag) => pos === tag.val);

    if (posTag && !sizeTag) {
      sizeTag = borders.sizes.find((tag) => "" === tag.val);
    } else if (sizeTag && !posTag) {
      posTag = borders.positions.find((tag) => "" === tag.val);
    } else if (!sizeTag && !posTag) {
      sizeTag = borders.sizes.find((tag) => "" === tag.val);
      posTag = borders.positions.find((tag) => "" === tag.val);
    }

    return `${_(`words.${posTag.key}`)} ${sizeTag.key}`;
  }

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

  function onBorderSizeChange({ detail: size }) {
    borderSize = size;
  }

  function onBorderPositionChange({ detail: position }) {
    borderPosition = position;
  }

  function onBorderAdd() {
    if (!bordersTags.includes(selectedBorders)) {
      set("borders", `${widget.borders} ${selectedBorders}`);
    }
  }

  function removeBorderTag(tag) {
    const borders = widget.borders
      .split(" ")
      .filter((border) => border !== tag);
    set("borders", borders.join(" "));
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
    object="{true}"
    items="{alignItems}"
    value="{widget.labelAlign}"
    label="{labelWord} | {_('words.align')}"
    on:change="{onUpdate.bind(null, 'labelAlign')}"
  />
  <Select
    object="{true}"
    items="{positionItems}"
    value="{widget.labelPosition}"
    label="{labelWord} | {_('words.position')}"
    on:change="{onUpdate.bind(null, 'labelPosition')}"
  />
  <div class="flex flex-wrap space-x-1">
    <Select
      object="{true}"
      value="{borderSize}"
      items="{borderSizes}"
      label="{_('words.borders')}"
      on:change="{onBorderSizeChange}"
    />
    <Select
      object="{true}"
      label="{false}"
      value="{borderPosition}"
      items="{borderPositions}"
      on:change="{onBorderPositionChange}"
    />
    <Button class="flex-auto bg-secondary" on:click="{onBorderAdd}">
      {_('words.add')}
    </Button>
  </div>
  <div class="flex flex-wrap {bordersTags.length ? '' : 'hidden'}">
    {#each bordersTags as tag}
      <div
        class="m-1 flex items-center bg-black bg-opacity-50 rounded overflow-hidden"
      >
        <div class="px-2 flex-auto">{formatTag(tag)}</div>
        <span
          on:click="{removeBorderTag.bind(null, tag)}"
          class="p-1 bg-red-600 cursor-pointer"
        ><Icon size="sm" icon="{MdClose}" /></span>
      </div>
    {/each}
  </div>
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
      <div
        class="flex items-center justify-center bg-red-700 w-10 h-10"
        on:click|stopPropagation="{removeBackgroundImage}"
      >
        <Icon icon="{MdDelete}" />
      </div>
    {/if}
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
