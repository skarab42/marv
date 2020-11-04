<script>
  import { debounce } from "throttle-debounce";
  import { createEventDispatcher } from "svelte";

  export let value = "";
  export let label = null;
  export let placeholder = "";
  export let bgColor = "bg-gray-400";
  export let textColor = "bg-gray-700";

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

  $: color = `${bgColor} ${textColor}`;
  $: inputRounded = label ? "rounded-r" : "rounded";
</script>

<label class="{color} inline-flex flex-shrink-0 items-center rounded">
  {#if label}<span class="px-2 uppercase">{label}</span>{/if}
  <input
    type="text"
    bind:value
    on:change
    on:input="{input}"
    on:keypress="{onKeypress}"
    placeholder="{placeholder}"
    class="p-2 flex w-full text-dark {inputRounded}"
  />
</label>
