<script>
  import api from "@/api/files";
  import { _ } from "@/libs/i18next";
  import { store } from "@/stores/files";
  import Button from "@/components/UI/Button.svelte";
  import GiBroom from "svelte-icons/gi/GiBroom.svelte";
  import ConfirmModal from "@/components/UI/ConfirmModal.svelte";

  let confirmPurgeModal = false;

  $: unusedFiles = $store.filter((file) => file.useCount === 0);
  $: askPurgeSentence = _("sentences.ask-purge", { count: unusedFiles.length });

  function onPuge() {
    confirmPurgeModal = true;
  }

  function onConfirmPurge({ detail: confirm }) {
    confirmPurgeModal = false;
    confirm && api.purge();
  }
</script>

{#if unusedFiles.length}
  <Button
    icon="{GiBroom}"
    on:click="{onPuge}"
    class="bg-pink-800"
    title="{askPurgeSentence}"
  />
{/if}

<ConfirmModal
  question="{askPurgeSentence}"
  on:confirm="{onConfirmPurge}"
  bind:opened="{confirmPurgeModal}"
/>
