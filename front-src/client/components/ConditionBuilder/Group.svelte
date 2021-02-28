<script>
  import Rule from "./Rule.svelte";
  import GroupLayout from "./GroupLayout.svelte";
  import { createEventDispatcher, getContext } from "svelte";

  const { defaultRule } = getContext("condition-builder");

  export let items;

  const weights = { and: 1, or: 1 };
  const disptach = createEventDispatcher();

  function onRemove(index) {
    items = items.filter((item, i) => i !== index);
    disptach("update", items);
  }

  function onUpdate({ index, rule }, { detail }) {
    items[index][rule] = detail;
    disptach("update", items);
  }

  function onRuleChange(index, { detail }) {
    items[index] = detail;
    disptach("update", items);
  }

  function onGroupChange(index, { detail }) {
    const values = Object.values(items[index])[0];
    items[index] = { [detail]: values };
    disptach("update", items);
  }

  function sortRules(a, b) {
    a = Object.keys(a)[0];
    b = Object.keys(b)[0];
    if (a === b) return 0;
    return (weights[a] || -1) - (weights[b] || -1);
  }

  function onAddGroup(index, { detail }) {
    items[index][detail] = [...items[index][detail], { and: [] }].sort(
      sortRules
    );
    disptach("update", items);
  }

  function onAddRule(index, { detail }) {
    items[index][detail] = [...items[index][detail], $defaultRule()].sort(
      sortRules
    );
    disptach("update", items);
  }
</script>

<div class="p-2 flex flex-col gap-2">
  {#each items as item, index}
    {#each Object.entries(item) as [rule, values]}
      {#if ['or', 'and'].includes(rule)}
        <GroupLayout
          rule="{rule}"
          on:addGroup="{onAddGroup.bind(null, index)}"
          on:addRule="{onAddRule.bind(null, index)}"
          on:update="{onGroupChange.bind(null, index)}"
          on:remove="{onRemove.bind(null, index)}"
        >
          <svelte:self
            items="{values}"
            on:update="{onUpdate.bind(null, { index, rule })}"
          />
        </GroupLayout>
      {:else}
        <Rule
          rule="{rule}"
          values="{values}"
          on:update="{onRuleChange.bind(null, index)}"
          on:remove="{onRemove.bind(null, index)}"
        />
      {/if}
    {/each}
  {/each}
</div>
