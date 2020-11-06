<script>
  import { debounce } from "throttle-debounce";
  import { createEventDispatcher } from "svelte";

  export let label = null;
  export let type = "text";
  export let padding = "p-2";
  export let textColor = "text-light";
  export let bgColor = "bg-dark-lighter";

  $: color = `${bgColor} ${textColor}`;

  const dispatch = createEventDispatcher();
  const debounceUpdate = debounce(500, update);

  function onKeypress(event) {
    if (event.keyCode == 13) {
      dispatch("enterKey");
    }
  }

  function update({ target }) {
    dispatch("update", target.value);
  }

  function input(event) {
    debounceUpdate(event);
    dispatch("input", event);
  }
</script>

<div class="flex flex-wrap items-center {color}">
  {#if label}
    <div class="{padding} uppercase">{label}</div>
  {/if}
  <div class="flex-auto">
    <input
      {...$$restProps}
      type="{type}"
      on:blur
      on:change
      on:input="{input}"
      on:keypress="{onKeypress}"
      class="{padding} w-full text-dark"
    />
  </div>
</div>
