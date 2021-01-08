<script>
  import getStyle from "../../../libs/getStyle";
  import getTrans from "../../../libs/getTrans";

  export let item;

  $: style = getStyle(item.target.style);
  $: trans = getTrans(item.target.trans);
</script>

<img
  class="absolute"
  draggable="{false}"
  id="item-{item.id}"
  alt="item-{item.id}"
  src="files/{item.target.filename}"
  style="{style};{trans};"
/>
