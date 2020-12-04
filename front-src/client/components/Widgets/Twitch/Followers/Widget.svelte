<script>
  import { _ } from "@/libs/i18next";
  import Follower from "./Follower.svelte";
  import { followers } from "@/stores/twitch";
  import Button from "@/components/UI/Button.svelte";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget = null;

  let selected = "online";
  const options = ["online", "offline"];

  function selectedClass(selected, name) {
    return selected === name ? "bg-secondary" : "bg-primary";
  }

  function select(option) {
    selected = option;
  }
</script>

<WidgetWrapper widget="{widget}">
  <div class="flex flex-col h-full">
    <div class="p-2 flex space-x-1">
      {#each options as option}
        <Button
          on:click="{select.bind(null, option)}"
          class="{selectedClass(selected, option)} rounded-t"
        >
          online
        </Button>
      {/each}
    </div>
    <div
      class="flex-auto overflow-auto divide-y divide-gray-900 divide-opacity-25"
    >
      {#each $followers as follower}
        <Follower follower="{follower}" type="{selected}" />
      {:else}
        <div class="p-2">{_('twitch.empty-follower-list')}</div>
      {/each}
    </div>
  </div>
</WidgetWrapper>
