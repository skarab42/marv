module.exports = async function authMiddleware(req, res, next) {
  if (req.path === "/twitch-auth") {
    res.end(`
      <script>
        window.location = '/twitch-auth/set?' + window.location.hash.slice(1);
      </script>
    `);
  } else if (req.path === "/twitch-auth/set") {
    res.end(`
      <h1>Done! You can close this window :)</h1>
      <script>window.close()</script>
      <script>window.location = '/'</script>
    `);
    this.setToken(req.query);
  }

  next();
};
