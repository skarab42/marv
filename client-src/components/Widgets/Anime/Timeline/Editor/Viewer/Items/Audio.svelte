<script>
  import getAttrs from "../../../libs/getAttrs";

  export let item;
  export let path = "/public/media/audios";
</script>

<audio
  class="hidden"
  id="item-{item.id}"
  src="{path}/{item.target.name}"
  {...getAttrs(item.target.attrs)}>
  <track kind="captions" />
</audio>
