<script>
  import { _ } from "@/libs/i18next";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";

  const dispatch = createEventDispatcher();

  export let visible = false;
  export let question = `${_("words.confirm")}?`;
  export let yesLabel = _("words.yes");
  export let noLabel = _("words.no");

  function confirm(response) {
    dispatch("confirm", response);
  }
</script>

{#if visible}
  <Modal class="bg-dark rounded">
    <div class="p-5 font-bold">{question}</div>
    <div class="flex p-5 space-x-2">
      <Button class="bg-primary" on:click="{confirm.bind(null, true)}">
        {yesLabel}
      </Button>
      <Button class="bg-dark-darker" on:click="{confirm.bind(null, false)}">
        {noLabel}
      </Button>
    </div>
  </Modal>
{/if}
