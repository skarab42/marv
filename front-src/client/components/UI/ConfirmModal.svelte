<script>
  import { _ } from "@/libs/i18next";
  import capitalize from "capitalize";
  import { createEventDispatcher } from "svelte";
  import Modal from "@/components/UI/Modal.svelte";
  import Button from "@/components/UI/Button.svelte";

  const dispatch = createEventDispatcher();

  export let question;
  export let opened = false;

  function confirm(response) {
    dispatch("confirm", response);
  }
</script>

<Modal bind:opened title="{capitalize(_('words.confirm'))}">
  <div class="flex flex-col p-5 gap-5">
    <div class="font-bold">{question}</div>
    <slot />
    <div class="flex gap-5">
      <Button
        class="flex-auto bg-primary"
        on:click="{confirm.bind(null, true)}"
      >
        {_('words.yes')}
      </Button>
      <Button
        class="flex-auto bg-dark-darker"
        on:click="{confirm.bind(null, false)}"
      >
        {_('words.no')}
      </Button>
    </div>
  </div>
</Modal>
