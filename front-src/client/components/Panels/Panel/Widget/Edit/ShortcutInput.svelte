<script>
  import { _ } from "@/libs/i18next";
  import Button from "@/components/UI/Button.svelte";
  import MdKeyboard from "svelte-icons/md/MdKeyboard.svelte";
  import { onDestroy, onMount, createEventDispatcher } from "svelte";

  export let value = "";

  let input = null;
  let shortcut = [];
  $: lastShortcut = value ? value.split("+") : [];

  const dispatch = createEventDispatcher();
  const modifiers = ["Meta", "Control", "Alt", "Shift"];

  function isModifier(event) {
    return modifiers.includes(event.key);
  }

  function addKey(event, uppercase = false) {
    shortcut = [...shortcut, uppercase ? event.key.toUpperCase() : event.key];
  }

  function addModifier(event) {
    if (!shortcut.includes(event.key)) {
      addKey(event);
    }
  }

  function onShortcut(shortcut) {
    lastShortcut = shortcut;
    dispatch("change", { shortcut, accelerator: getAccelerator(shortcut) });
  }

  function onKeyDown(event) {
    event.preventDefault();

    if (isModifier(event)) {
      addModifier(event);
    } else {
      if (shortcut.length) {
        addKey(event, true);
        onShortcut(shortcut);
      }
      shortcut = [];
    }
  }

  function getAccelerator(shortcut) {
    return shortcut.join("+");
  }

  function onReset() {
    shortcut = [];
    lastShortcut = [];
    dispatch("reset");
  }

  $: placeholder = shortcut.length
    ? getAccelerator(shortcut)
    : _("sentences.type-shortcut-here");

  onMount(() => {
    input.addEventListener("keydown", onKeyDown);
  });

  onDestroy(() => {
    input.removeEventListener("keydown", onKeyDown);
  });
</script>

<div class="flex flex-auto items-center text-light">
  <div style="width:50%" class="p-2 font-medium uppercase bg-dark-lighter">
    {_('words.shortcut')}
  </div>
  <input
    type="text"
    style="width:50%"
    bind:this="{input}"
    placeholder="{placeholder}"
    class="p-2 text-dark {lastShortcut.length ? 'hidden' : ''}"
  />
  {#if lastShortcut.length}
    <div class="flex gap-2 flex-auto text-center overflow-hidden">
      <div class="p-2 flex-auto bg-green-600">
        {getAccelerator(lastShortcut)}
      </div>
    </div>
  {/if}
</div>

<Button
  class="bg-pink-700"
  icon="{MdKeyboard}"
  on:click="{onReset}"
  disabled="{!lastShortcut.length}"
/>
