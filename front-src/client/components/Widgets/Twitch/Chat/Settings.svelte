<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import { user } from "@/stores/twitch";
  import Input from "@/components/UI/Input.svelte";
  import Select from "@/components/UI/Select.svelte";

  export let data;

  let { panel, widget } = data;

  $: props = widget.component.props;

  function onThemeChange({ detail: theme }) {
    props.theme = theme;
    update(panel);
  }

  function onChannelChange({ detail: channel }) {
    props.channel = channel;
    update(panel);
  }
</script>

<div class="p-2 pt-0 space-y-2 flex flex-auto flex-col">
  <Input
    label="{_('words.channel')}"
    value="{props.channel}"
    on:update="{onChannelChange}"
    placeholder="{$user ? $user.display_name : '#channel'}"
  />
  <Select
    label="{_('words.theme')}"
    value="{props.theme}"
    items="{props.themes}"
    on:change="{onThemeChange}"
  />
</div>
