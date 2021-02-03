<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";

  export let widget;

  let tags = [];

  api.getEventNames().then((names) => {
    const arr = names.find((event) => event.name === widget.eventName);
    tags = arr ? arr.tags : [];
  });
</script>

<div class="pt-5 px-5 flex gap-2">
  {#each tags as tag}
    <div class="px-2 bg-gray-900 rounded cursor-pointer">${tag}</div>
  {/each}
</div>
