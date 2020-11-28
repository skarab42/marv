<script>
  import { _ } from "@/libs/i18next";
  import { update } from "@/libs/panels";
  import { user } from "@/stores/twitch";
  import Input from "@/components/UI/Input.svelte";
  import Checkbox from "@/components/UI/Checkbox.svelte";

  export let data;

  let { panel, widget } = data;

  $: props = widget.component.props;

  function onChannelChange({ detail: channel }) {
    props.channel = channel;
    update(panel);
  }

  function onCheckboxChange(key, { target }) {
    props[key] = target.checked;
    update(panel);
  }
</script>

<div class="p-2 pt-0 space-y-2 flex flex-col">
  <Input
    label="{_('words.channel')}"
    value="{props.channel}"
    on:update="{onChannelChange}"
    placeholder="{$user ? $user.display_name : '#channel'}"
  />
  <Checkbox
    label="{_('words.muted')}"
    checked="{props.muted}"
    on:change="{onCheckboxChange.bind(null, 'muted')}"
  />
  <Checkbox
    label="{_('words.autoplay')}"
    checked="{props.autoplay}"
    on:change="{onCheckboxChange.bind(null, 'autoplay')}"
  />
</div>
