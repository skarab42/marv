<script>
  import ActionEventSelect from "./ActionEventSelect.svelte";
  import { update, registerShortcut, unregisterShortcut } from "@/libs/panels";

  export let panel;
  export let widget;
  export let eventNames;

  let showInvalidShortcutMessage = false;

  function change(key, value) {
    widget[key] = value;
    update(panel);
  }

  async function onShortcutChange(shortcut) {
    const { result } = await registerShortcut(shortcut.accelerator);
    const shortcutName = result ? shortcut.accelerator : "";
    showInvalidShortcutMessage = !result;
    change("shortcutName", shortcutName);
  }

  function onShortcutReset() {
    change("shortcutName", "");
    unregisterShortcut();
  }

  function onChange({ detail }) {
    onShortcutReset();

    if (detail.key === "shortcutName") {
      onShortcutChange(detail.value);
      return;
    }

    change(detail.key, detail.value);
  }
</script>

<ActionEventSelect
  event="{widget}"
  eventNames="{eventNames}"
  on:change="{onChange}"
  on:shortcutReset="{onShortcutReset}"
  bind:showInvalidShortcutMessage
/>
