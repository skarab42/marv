<script>
  import getAttrs from "../../../libs/getAttrs";
  import getStyle from "../../../libs/getStyle";
  import getTrans from "../../../libs/getTrans";

  export let item;
  export let path = "/public/media/videos";

  $: style = getStyle(item.target.style);
  $: trans = getTrans(item.target.trans);
</script>

<video
  class="absolute"
  id="item-{item.id}"
  src="{path}/{item.target.name}"
  {...getAttrs(item.target.attrs)}
  style="{style};{trans};">
  <track kind="captions" />
</video>
