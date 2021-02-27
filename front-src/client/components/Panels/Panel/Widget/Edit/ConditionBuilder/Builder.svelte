<script>
  import api from "@/api/twitch";
  import { _ } from "@/libs/i18next";
  import Group from "./Group.svelte";
  import { writable } from "svelte/store";
  import { onMount, setContext, createEventDispatcher } from "svelte";

  export let event;

  $: items = event.rules || [];

  const tags = writable([]);
  const defaultRule = writable(null);
  const rules = [
    "==",
    "!=",
    "<",
    ">",
    "<=",
    ">=",
    "range<",
    "range<=",
    "^",
    "$",
  ];
  const buttonClass =
    "uppercase text-xs cursor-pointer px-2 bg-black bg-opacity-25";

  const disptach = createEventDispatcher();

  setContext("condition-builder", { tags, rules, defaultRule });

  onMount(async () => {
    const events = await api.getEvents();
    const result = events.find((e) => e.name === event.eventName);

    if (!result) return;

    tags.set(Object.keys(result.tags));

    if (event.eventName === "onCommand") {
      const commands = await api.getCommandList();
      const command = commands.find((c) => c.name === event.commandName);
      if (command && command.usage) {
        tags.update((state) => [...command.usage.split(" "), ...state]);
      }
    }

    $defaultRule = () => ({ [rules[0]]: [{ var: $tags[0] }, ""] });

    if (!items.length) {
      items = [$defaultRule()];
    }
  });

  function onUpdate({ detail }) {
    items = detail;
    event.rules = items;
    disptach("update", event);
  }

  function onAddRule() {
    onUpdate({ detail: [{ and: [items[0], $defaultRule()] }] });
  }

  function onAddFirstRule() {
    onUpdate({ detail: [$defaultRule()] });
  }

  $: hasRootGroup =
    items[0] && ["or", "and"].includes(Object.keys(items[0])[0]);
</script>

{#if $tags.length && items.length}
  {#if items.length === 1 && !hasRootGroup}
    <button class="m-2 mb-0 {buttonClass}" on:click="{onAddRule}">
      <span>+ {_('words.rule')}</span>
    </button>
  {/if}

  <Group items="{items}" on:update="{onUpdate}" />
{:else}
  <button class="m-2 {buttonClass}" on:click="{onAddFirstRule}">
    <span>+ {_('words.rule')}</span>
  </button>
{/if}
