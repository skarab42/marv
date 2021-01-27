<script>
  import Modal from "@/components/UI/Modal.svelte";

  export let title;
</script>

<Modal on:close {...$$restProps}>
  <div class="bg-dark text-light rounded">
    <div class="px-5 py-2 capitalize font-bold bg-primary rounded-t">
      {title}
    </div>
    <div class="p-5">
      <slot />
    </div>
  </div>
</Modal>
