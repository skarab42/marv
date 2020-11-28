<script>
  export let percent;
  export let height = 4;
  export let color = "rgba(0,0,0,0.3)";
  export let bgColor = "transparent";
</script>

<div style="background-color:{bgColor};">
  <div
    style="background-color:{color};width:{percent}%;height:{height}px;"
  ></div>
</div>
