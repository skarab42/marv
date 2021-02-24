<script>
  import api from "@/api/twitch";
  import Group from "./Group.svelte";
  import { writable } from "svelte/store";
  import { onMount, setContext } from "svelte";

  export let event;

  const tags = writable([]);
  const rules = ["==", "!=", "<", ">", "<=", ">=", "range:<", "range:<="];

  setContext("condition-builder", { tags, rules });

  function getEvents() {
    api.getEvents().then((events) => {
      const result = events.find((e) => e.name === event.eventName);
      tags.set(result ? Object.keys(result.tags) : []);
    });
  }

  onMount(() => getEvents());

  const items = [
    {
      or: [
        { "==": [{ var: "tiers" }, 800] },
        {
          and: [
            { ">": [{ var: "tiers" }, 100] },
            { "<": [{ var: "plan" }, 200] },
          ],
        },
        {
          and: [
            { ">=": [{ var: "user" }, 100] },
            { "<=": [{ var: "tiers" }, 200] },
            {
              or: [
                { "!=": [{ var: "tiers" }, 100] },
                { "<": [{ var: "tiers" }, 200] },
                { "<": [-42, { var: "tiers" }, 200] },
                { "<=": [10, { var: "tiers" }, 200] },
              ],
            },
            ,
          ],
        },
        ,
      ],
    },
  ];
</script>

<Group items="{items}" />
