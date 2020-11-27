<script>
  import { user } from "@/stores/twitch";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget = null;

  $: theme = widget.component.props.theme;
  $: channel =
    widget.component.props.channel || $user ? $user.display_name : "";
  $: url = `https://www.twitch.tv/embed/${channel}/chat?parent=localhost&${theme}popout&no-reload=false`;
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
