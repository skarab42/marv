<script>
  import MarvLogo from "@/images/marv.svg";
  import i18n from "@/api/i18n";

  const _ = i18n();
</script>

<div class="flex h-screen overflow-auto">
  <div class="m-auto">
    <div class="flex flex-col items-center space-y-5">
      <MarvLogo width="200" />
      <div class="font-bold text-2xl">
        {#await _}
        	Welcome home!
        {:then _}
        	{_('loading.welcome-message')}
        {/await}
      </div>
      <div class="font-bold text-2xl">
        {#await _}
        	Waiting for connexion...
        {:then _}
        	{_('loading.waiting-for-connexion')}
        {/await}
      </div>
    </div>
  </div>
</div>
