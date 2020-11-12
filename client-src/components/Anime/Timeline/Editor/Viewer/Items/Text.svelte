<script>
  import { fetchText } from "../../../libs/utils";
  import getStyle from "../../../libs/getStyle";
  import getTrans from "../../../libs/getTrans";

  export let item;

  $: style = getStyle(item.target.style);
  $: trans = getTrans(item.target.trans);
</script>

{#await fetchText(item.target.filename) then text}
<div
  class="absolute"
  id="item-{item.id}"
  style="{style};{trans};">
  {text}
</div>
{/await}
