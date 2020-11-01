<script>
  import MarvLogo from "@/assets/images/marv.svg";
</script>

<div class="flex h-screen overflow-auto">
  <div class="m-auto">
    <div class="m-5 flex flex-col items-center">
      <MarvLogo width="200" />
      <slot />
    </div>
  </div>
</div>
