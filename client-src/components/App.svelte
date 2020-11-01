<script>
  import i18next, { _ } from "@/libs/i18next";
  import { on } from "@/libs/socket.io";

  let title = "Waiting for connexion...";

  on("connect", async () => {
    await i18next();
    title = _("loading.welcome-message");
  });

  on("disconnect", () => {
    title = "Waiting for connexion...";
  });
</script>

{title}
