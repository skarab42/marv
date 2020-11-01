<script>
  import MarvLogo from "@/images/marv.svg";
  import { config } from "@/stores/config";
  import { initialized } from "@/stores/app";
  import { _ } from'@/libs/i18next';
</script>

<div class="flex h-screen overflow-auto">
  <div class="m-auto">
    <div class="m-5 flex flex-col items-center text-center space-y-5">
      <MarvLogo width="200" />
      {#if $config}
      <div class="font-mono	text-2xl">
        {$config.app.fingerprint}
      </div>
      {/if}
      <div class="font-bold text-4xl">
      {#if $initialized}
        {_('loading.welcome-message')}
      {:else}
        Loading...
      {/if}
      </div>
      <div class="font-mono	text-2xl">
      {#if $initialized}
        {_('loading.waiting-for-connexion')}...
      {/if}
      </div>
    </div>
  </div>
</div>
