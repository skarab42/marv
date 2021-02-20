<script>
  import { debounce } from "throttle-debounce";
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";

  export let icon = null;
  export let label = null;
  export let type = "text";
  export let rootClass = "";
  export let labelClass = "p-2";
  export let inputClass = "p-2";
  export let labelMinWidth = "50%";
  export let textColor = "text-light";
  export let bgColor = "bg-dark-lighter";

  $: color = `${bgColor} ${textColor}`;
  $: inputHidden = type === "checkbox" ? "hidden" : "";
  $: labelStyle = labelMinWidth ? `min-width:${labelMinWidth}` : "";

  const dispatch = createEventDispatcher();
  const debounceUpdate = debounce(500, update);

  function onKeypress(event) {
    if (event.keyCode == 13) {
      dispatch("enterKey", event);
    }
  }

  function update({ target }) {
    dispatch("update", target.value);
  }

  function onInput(event) {
    debounceUpdate(event);
    dispatch("input", event);
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="flex flex-wrap items-center {color} {rootClass}">
  {#if label}
    <div style="{labelStyle}" class="flex font-medium uppercase {labelClass}">
      {#if icon}
        <Icon icon="{icon}" class="mr-2" />
      {/if}
      <span>{label}</span>
    </div>
  {/if}
  <div class="flex-auto">
    <input
      {...$$restProps}
      type="{type}"
      on:blur
      on:change
      on:input="{onInput}"
      on:keypress="{onKeypress}"
      class="{inputClass} w-full text-dark {inputHidden} bg-white bg-opacity-75 focus:bg-opacity-100"
    />
  </div>
</label>
