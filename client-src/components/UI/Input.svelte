<script>
  import { debounce } from "throttle-debounce";
  import { createEventDispatcher } from "svelte";

  export let label = null;
  export let type = "text";
  export let padding = "p-2";
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
  $: rounded = label ? "rounded-r" : "rounded";

  let flex = "flex flex-auto";
</script>

<div class="flex flex-wrap items-center {color}">
  <div class="{padding} {flex} uppercase">{label}</div>
  <input
    {...$$restProps}
    type="{type}"
    on:blur
    on:change
    on:input="{input}"
    on:keypress="{onKeypress}"
    class="{padding} {flex} text-dark"
  />
</div>
