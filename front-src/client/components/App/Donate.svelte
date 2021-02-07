<script>
  import { _ } from "@/libs/i18next";
  import FaGithub from "svelte-icons/fa/FaGithub.svelte";
  import GiHearts from "svelte-icons/gi/GiHearts.svelte";
  import FaCcPaypal from "svelte-icons/fa/FaCcPaypal.svelte";

  const buttonClass =
    "p-2 bg-gray-300 hover:bg-pink-600 text-pink-600 hover:text-gray-300 rounded flex items-center justify-center";
</script>

<div class="p-2 flex gap-2 bg-pink-600">
  <div class="w-6 h-6">
    <GiHearts />
  </div>
  <div class="uppercase font-bold tracking-wider">{_('words.donate')}</div>
</div>

<div class="p-2 grid grid-cols-2 gap-5">
  <a
    href="https://github.com/sponsors/skarab42"
    target="_blank"
    class="{buttonClass}"
  >
    <div class="w-10">
      <FaGithub />
    </div>
  </a>
  <a href="https://paypal.me/skarab" target="_blank" class="{buttonClass}">
    <div class="w-10">
      <FaCcPaypal />
    </div>
  </a>
</div>
