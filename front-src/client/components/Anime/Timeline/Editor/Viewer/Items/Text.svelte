<script>
  import { fetchText } from "../../../libs/utils";
  import getStyle from "../../../libs/getStyle";
  import getTrans from "../../../libs/getTrans";

  export let item;

  $: style = getStyle(item.target.style);
  $: trans = getTrans(item.target.trans);

  let text = "Loading...";

  $: fetchText(item.target.filename).then((txt) => (text = txt));
</script>

<div
  class="break-words absolute border-2 border-opacity-0 border-red-600 hover:border-opacity-100 hover:bg-light hover:text-dark hover:bg-opacity-50"
  id="item-{item.id}"
  style="{style};{trans};"
>
  {text}
</div>
