<script>
  import { _ } from "@/libs/i18next";
  import GiHearts from "svelte-icons/gi/GiHearts.svelte";
  import FaCcPaypal from "svelte-icons/fa/FaCcPaypal.svelte";
</script>

<div class="p-2">
  <a
    class="p-2 flex items-center space-x-5 justify-center bg-pink-600 rounded"
    href="https://paypal.me/skarab"
    target="_blank"
  >
    <div class="relative truncate uppercase px-5 text-4xl">
      {_('words.donate')}
      <span class="absolute top-0 right-0 w-6 h-6"><GiHearts /></span>
    </div>
    <div class="w-20">
      <FaCcPaypal />
    </div>
  </a>
</div>
