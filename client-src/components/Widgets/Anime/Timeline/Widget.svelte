<script>
  import { push, on } from "@/libs/actions";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  let running = 0;
  let clickCount = 0;

  function triggerAction() {
    push({
      type: "anime",
      widgetId: widget.id,
      trigger: widget.trigger,
      data: "data...",
    })
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  on("push", (action) => {
    if (action.widgetId === widget.id) {
      clickCount++;
    }
  });

  on("start", (action) => {
    if (action.widgetId === widget.id) {
      running++;
    }
  });

  on("end", (action) => {
    if (action.widgetId === widget.id) {
      clickCount--;
      running--;
    }
  });
</script>

<WidgetWrapper widget="{widget}" on:click="{triggerAction}">
  <div class="p-2">running: {clickCount}/{running}</div>
</WidgetWrapper>
