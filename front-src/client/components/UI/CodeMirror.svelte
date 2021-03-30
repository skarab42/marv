<script>
  import CodeMirror from "codemirror";
  import { debounce } from "throttle-debounce";
  import { createEventDispatcher } from "svelte";

  import "codemirror/mode/htmlembedded/htmlembedded";

  import "codemirror/lib/codemirror.css";
  import "codemirror/theme/material-palenight.css";

  export let code;

  const dispatch = createEventDispatcher();
  const changeDebounce = debounce(500, change);

  let codeArea = null;

  $: if (codeArea) codeMirrorInit();

  function change(value) {
    dispatch("change", value.trim());
  }

  function codeMirrorInit() {
    const myCodeMirror = CodeMirror.fromTextArea(codeArea, {
      theme: "material-palenight",
      mode: "application/x-ejs",
      lineNumbers: true,
      tabSize: 2,
    });

    myCodeMirror.on("changes", () => {
      changeDebounce(myCodeMirror.getValue());
    });
  }
</script>

<textarea
  bind:this="{codeArea}"
  class="p-2 text-dark"
  style="min-width:50vw; min-height:250px"
>{code}</textarea>
