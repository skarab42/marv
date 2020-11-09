<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import { update } from "@/libs/panels";
  import Select from "@/components/UI/Select.svelte";

  export let panel;
  export let widget;

  $: scenes = $state.scenes || [];
  $: props = widget.component.props;
  $: items = [_("words.none"), ...scenes.map((s) => s.name)];

  function onChange(key, { detail: scene }) {
    props[key] = scene;
    update(panel);
  }
</script>

<div class="p-2">
  <Select
    label="{_('words.scene')} n°1"
    value="{props.scene1}"
    items="{items}"
    on:change="{onChange.bind(null, 'scene1')}"
  />
  <Select
    label="{_('words.scene')} n°2"
    value="{props.scene2}"
    items="{items}"
    on:change="{onChange.bind(null, 'scene2')}"
  />
</div>
