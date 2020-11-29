<script>
  import ColorPicker from "@/components/UI/ColorPicker.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let value;

  let attrs = { h: 0, v: 0, blur: 0, color: "#111" };

  let cls = "px-2 w-1/2 flex-1 text-dark rounded";

  $: if (value) {
    let [h, v, blur, color] = value.split(" ");
    attrs.h = parseInt(h);
    attrs.v = parseInt(v);
    attrs.blur = parseInt(blur);
    attrs.color = color;
  }

  $: textshadow = `${attrs.h}px ${attrs.v}px ${attrs.blur}px ${attrs.color}`;

  function onChange(key, { target, detail }) {
    attrs[key] = detail ? detail.hex : target.value;
    dispatch("change", textshadow);
  }
</script>

<div class="flex space-x-1">
  <input
    type="number"
    value="{attrs.h}"
    on:change="{onChange.bind(null, 'h')}"
    class="{cls}"
  />
  <input
    type="number"
    value="{attrs.v}"
    on:change="{onChange.bind(null, 'v')}"
    class="{cls}"
  />
  <input
    type="number"
    value="{attrs.blur}"
    on:change="{onChange.bind(null, 'blur')}"
    class="{cls}"
  />
</div>

<ColorPicker
  label="{false}"
  position="right"
  color="{attrs.color}"
  previewClass="h-5 rounded"
  on:color="{onChange.bind(null, 'color')}"
/>
