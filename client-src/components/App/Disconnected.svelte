<script>
  import MarvLogo from "@/images/marv.svg";
  import { config } from "@/stores/config";
  import { _ } from'@/libs/i18next';
</script>

<div class="flex h-screen overflow-auto">
  <div class="m-auto">
    <div class="m-5 flex flex-col items-center text-center space-y-5">
      <MarvLogo width="200" />
      <div class="font-mono	text-2xl">
        {$config.app.fingerprint}
      </div>
      <div class="font-bold text-4xl">
        {_('words.disconnected')}
      </div>
      <div class="font-mono	text-2xl">
        {_('loading.waiting-for-connexion')}...
      </div>
    </div>
  </div>
</div>
