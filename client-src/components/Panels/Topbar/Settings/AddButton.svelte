<script>
  import api from "@/libs/panels";
  import { _ } from "@/libs/i18next";
  import { currentPanel } from "@/stores/panels";
  import Button from "@/components/UI/Button.svelte";
  import MdAddToPhotos from "svelte-icons/md/MdAddToPhotos.svelte";

  function addWidget() {
    api.addWidget($currentPanel);
  }
</script>

<Button padding="p-2" icon="{MdAddToPhotos}" on:click="{addWidget}">
  <span class="hidden md:inline md:ml-2">{_('sentences.add-grid-widget')}</span>
</Button>
