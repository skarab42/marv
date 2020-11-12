<script>
  import getAttrs from "../../../libs/getAttrs";

  export let item;
</script>

<audio
  class="hidden"
  id="item-{item.id}"
  src="files/{item.target.filename}"
  {...getAttrs(item.target.attrs)}
>
  <track kind="captions" />
</audio>
