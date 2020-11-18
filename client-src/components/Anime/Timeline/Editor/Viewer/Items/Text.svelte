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

<div class="absolute" id="item-{item.id}" style="{style};{trans};">{text}</div>
