<script>
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";
  import { update } from "@/libs/panels";
  import Select from "@/components/UI/Select.svelte";

  export let data;

  let sources = [];
  let { panel, widget } = data;
  let none = _("words.none");

  $: if ($state.sources) {
    sources = $state.sources.filter((source) => source.caps.hasAudio);
    sources = [none, ...sources.map((source) => source.name)];
  }
  $: props = widget.component.props;

  function onChange(key, { detail }) {
    props[key] = detail === none ? null : detail;
    update(panel);
  }
</script>

<div class="p-2 pt-0 space-y-2 flex flex-auto flex-col">
  <Select
    items="{sources}"
    value="{props.source}"
    label="{_('words.source')}"
    on:change="{onChange.bind(null, 'source')}"
  />
</div>
