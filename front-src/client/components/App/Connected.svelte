<script>
  import FirstStart from "./FirstStart.svelte";
  import CheckUpdate from "./CheckUpdate.svelte";
  import Dashboard from "@/components/Dashboard/Main.svelte";

  // import ModalRefacto from "@/components/UI/Modal.svelte";

  // function onClose() {
  //   console.log("modal closed");
  // }

  // let modalOpened = false;

  // function openModal() {
  //   modalOpened = true;
  // }
</script>

<Dashboard />
<FirstStart />
<CheckUpdate />

<!-- <button on:click="{openModal}">open modal</button>

<ModalRefacto bind:opened="{modalOpened}" title="prout" on:close="{onClose}">
  <div class="p-2">Prout...</div>
</ModalRefacto> -->
