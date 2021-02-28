<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import { update } from "@/libs/panels";
  import Select from "@/components/UI/Select.svelte";

  export let data;

  let none = _("words.none");

  $: panel = data.panel;
  $: widget = data.widget;
  $: scenes = $state.scenes || [];
  $: props = widget.component.props;
  $: items = [none, ...scenes.map((s) => s.name)];

  function onChange({ detail }) {
    props.scene = detail === none ? null : detail;
    update(panel);
  }
</script>

<div class="p-2 pt-0 flex-auto">
  <Select
    label="{_('words.scene')}"
    value="{props.scene}"
    items="{items}"
    on:change="{onChange}"
  />
</div>
