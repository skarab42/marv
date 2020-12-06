<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Follower from "./Follower.svelte";
  import { followers } from "@/stores/twitch";
  import Button from "@/components/UI/Button.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";
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

  async function onRefresh() {
    $followers = await api.getLastFollowers();
  }
</script>

<WidgetWrapper widget="{widget}">
  <div class="flex flex-col h-full">
    <Button
      icon="{MdRefresh}"
      on:click="{onRefresh}"
      class="w-full p-2 bg-white bg-opacity-25"
    >
      <span>{_('words.refresh')}</span>
    </Button>
    <div class="p-2 flex space-x-1 items-center">
      {#each options as option}
        <Button
          on:click="{select.bind(null, option)}"
          class="{selectedClass(selected, option)} rounded-t"
        >
          {_(`words.${option}`)}
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
