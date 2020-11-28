<script>
  import { user } from "@/stores/twitch";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget = null;

  $: muted = widget.component.props.muted;
  $: autoplay = widget.component.props.autoplay;
  $: displayName = $user ? $user.display_name : "";
  $: channel = widget.component.props.channel || displayName;
  $: query = `channel=${channel}&muted=${muted}&autoplay=${autoplay}&parent=localhost`;
  $: url = `https://player.twitch.tv/?${query}`;
</script>

<WidgetWrapper widget="{widget}">
  <iframe
    frameborder="0"
    scrolling="no"
    src="{url}"
    height="100%"
    width="100%"
    title="#{channel}"
  ></iframe>
</WidgetWrapper>
