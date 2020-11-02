<script>
  import { store } from "@/stores/app";
  import MarvLogo from "@/assets/images/marv.svg";
  import CenteredBox from "@/components/UI/CenteredBox.svelte";

  $: fingerprint = $store ? $store.fingerprint : "010110110101s";
</script>

<CenteredBox>
  <MarvLogo width="200" />
  <div class="text-center font-mono">{fingerprint}</div>
  <slot />
</CenteredBox>
