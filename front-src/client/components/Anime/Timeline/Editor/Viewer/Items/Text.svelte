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

  async function getText(filename, data) {
    try {
      html = await fetchText(filename, data);
      data = data || { eventName: "animePreview" };
      Object.keys(data).forEach((tag) => {
        html = html.replace(`$${tag}`, data[tag]);
      });
      html = ejs.render(html, data);
    } catch (error) {
      html = `<pre>${error}</pre>`;
    }
  }

  $: getText(item.target.filename, $fakeEvent);
</script>

<div
  class="break-words absolute border-2 border-opacity-0 border-red-600 hover:border-opacity-100 hover:bg-light hover:text-dark hover:bg-opacity-50"
  id="item-{item.id}"
  style="{style};{trans};"
>
  {@html html}
</div>
