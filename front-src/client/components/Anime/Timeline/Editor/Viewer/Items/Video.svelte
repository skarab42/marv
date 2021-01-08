<script>
  import getAttrs from "../../../libs/getAttrs";
  import getStyle from "../../../libs/getStyle";
  import getTrans from "../../../libs/getTrans";

  export let item;

  $: style = getStyle(item.target.style);
  $: trans = getTrans(item.target.trans);
</script>

<video
  class="absolute"
  id="item-{item.id}"
  src="files/{item.target.filename}"
  {...getAttrs(item.target.attrs)}
  style="{style};{trans};"
>
  <track kind="captions" />
</video>
