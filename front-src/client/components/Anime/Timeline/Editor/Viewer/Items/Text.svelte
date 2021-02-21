<script>
  import ejs from "../../../../../../../libs/ejs";
  import { fetchText } from "../../../libs/utils";
  import getStyle from "../../../libs/getStyle";
  import getTrans from "../../../libs/getTrans";
  import { getContext } from "svelte";

  export let item;

  const { fakeEvent } = getContext("Editor");

  $: style = getStyle(item.target.style);
  $: trans = getTrans(item.target.trans);

  let html = "Loading...";

  $: fetchText(item.target.filename).then((rawText) => {
    const data = $fakeEvent || { eventName: "animePreview" };
    try {
      html = ejs.render(rawText, data);
    } catch (error) {
      html = `<pre>${error}</pre>`;
    }
  });
</script>

<div
  class="break-words absolute border-2 border-opacity-0 border-red-600 hover:border-opacity-100 hover:bg-light hover:text-dark hover:bg-opacity-50"
  id="item-{item.id}"
  style="{style};{trans};"
>
  {@html html}
</div>
