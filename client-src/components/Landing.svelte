<script>
  import MarvLogo from "../images/marv.svg";

  function connect() {
    console.log("connect...");
  }
</script>

<div class="flex h-screen overflow-auto">
  <div class="m-auto">
    <div class="flex flex-col items-center space-y-5">
      <MarvLogo width="200" />
      <div class="font-bold text-2xl">
        Welcome home!
      </div>
      <button class="p-5 bg-purple-700 rounded" on:click={connect}>
        Enter to the Twitch game
      </button>
    </div>
  </div>
</div>
