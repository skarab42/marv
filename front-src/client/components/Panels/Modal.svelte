<script>
  import Modal from "@/components/UI/Modal.svelte";

  export let title;
</script>

<Modal on:close {...$$restProps}>
  <div class="bg-dark text-light rounded">
    <div class="px-5 pr-20 py-2 font-bold bg-primary rounded-t">{title}</div>
    <div class="p-5">
      <slot />
    </div>
  </div>
</Modal>
