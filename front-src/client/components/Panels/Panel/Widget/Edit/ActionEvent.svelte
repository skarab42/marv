<script>
  import { createEventDispatcher } from "svelte";
  import ActionEventSelect from "./ActionEventSelect.svelte";
  import { registerShortcut, unregisterShortcut } from "@/libs/panels";

  export let event;
  export let eventNames;

  let showInvalidShortcutMessage = false;
  const dispatch = createEventDispatcher();

  function change(key, value) {
    dispatch("change", { key, value });
  }

  async function onShortcutChange(shortcut) {
    const { result } = await registerShortcut(shortcut.accelerator);
    const shortcutName = result ? shortcut.accelerator : "";
    showInvalidShortcutMessage = !result;
    change("shortcutName", shortcutName);
  }

  async function onShortcutReset() {
    await unregisterShortcut();
    change("shortcutName", null);
  }

  async function onChange({ detail }) {
    if (detail.key === "shortcutName") {
      await onShortcutChange(detail.value);
      return;
    }

    change(detail.key, detail.value);
  }
</script>

<ActionEventSelect
  event="{event}"
  eventNames="{eventNames}"
  on:change="{onChange}"
  on:shortcutReset="{onShortcutReset}"
  bind:showInvalidShortcutMessage
/>
