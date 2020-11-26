<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import { update } from "@/libs/panels";
  import Select from "@/components/UI/Select.svelte";

  export let data;

  let { panel, widget } = data;

  $: scenes = $state.scenes || [];
  $: props = widget.component.props;
  $: items = [_("words.none"), ...scenes.map((s) => s.name)];

  function onChange({ detail: scene }) {
    props.scene = scene;
    update(panel);
  }
</script>

<div class="p-2 pt-0">
  <Select
    label="{_('words.scene')}"
    value="{props.scene}"
    items="{items}"
    on:change="{onChange}"
  />
</div>
