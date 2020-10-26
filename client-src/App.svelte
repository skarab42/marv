<script>
  import Landing from "./components/Landing.svelte";
  import Dashboard from "./components/Dashboard.svelte";

  let component = Landing;

  setTimeout(function () {
    component = Dashboard;
  }, 1000);
</script>

<svelte:component this={component} />
