<script>
  import { push } from "@/libs/actions";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  function triggerAction() {
    push({ type: "anime", widget }).catch((error) => {
      console.log(">>>Error:", error);
    });
  }
</script>

<WidgetWrapper
  widget="{widget}"
  on:click="{triggerAction}"
  class="cursor-pointer bg-opacity-25 bg-black hover:bg-transparent"
/>
