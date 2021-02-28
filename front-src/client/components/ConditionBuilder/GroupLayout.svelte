<script>
  import { createEventDispatcher } from "svelte";
  import RemoveCross from "./RemoveCross.svelte";
  import { _ } from "@/libs/i18next";

  export let rule;

  const rules = ["and", "or"];
  let removeButtonVisible = false;
  const buttonClass =
    "uppercase text-xs cursor-pointer px-2 bg-black bg-opacity-25";

  const disptach = createEventDispatcher();

  function onRemove() {
    disptach("remove");
  }

  function onUpdate(newRule) {
    rule = newRule;
    disptach("update", newRule);
  }

  function showRemoveButton() {
    removeButtonVisible = true;
  }

  function hideRemoveButton() {
    removeButtonVisible = false;
  }

  function onAddGroup() {
    disptach("addGroup", rule);
  }

  function onAddRule() {
    disptach("addRule", rule);
  }
</script>

<div
  on:mouseenter="{showRemoveButton}"
  on:mouseleave="{hideRemoveButton}"
  class="border border-secondary rounded"
>
  <div class="flex gap-2">
    <div class="rounded-br flex overflow-hidden">
      {#each rules as name}
        <div
          on:click="{onUpdate.bind(null, name)}"
          class="flex items-center px-2 {rule === name ? 'bg-blue-600' : 'cursor-pointer bg-gray-600'}"
        >
          <span class="text-sm uppercase">{_(`words.${name}`)}</span>
        </div>
      {/each}
    </div>
    <div class="flex p-1 gap-2">
      <div class="{buttonClass}" on:click="{onAddGroup}">
        <span>+ {_('words.group')}</span>
      </div>
      <div class="{buttonClass}" on:click="{onAddRule}">
        <span>+ {_('words.rule')}</span>
      </div>
    </div>
    <div class="flex-auto"></div>
    <div class="pt-1 pr-4">
      <RemoveCross visible="{removeButtonVisible}" on:click="{onRemove}" />
    </div>
  </div>
  <slot />
</div>
