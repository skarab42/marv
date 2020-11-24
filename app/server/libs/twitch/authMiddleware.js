function twitchAuth(req, res) {
  if (req.query.error) {
    this.rejectToken(req.query);

    return res.end(`
      <h1>Error! ${req.query.error_description}...</h1>
      <script>setTimeout(() => { window.location = '/' }, 5000);</script>
    `);
  }

  res.end(`
    <script>
      window.location = '/twitch-auth/set?' + window.location.hash.slice(1);
    </script>
  `);
}

function twitchAuthSet(req, res) {
  res.end(`
    <h1>Logged-In! You can close this window :)</h1>
    <script>setTimeout(() => { window.location = '/' }, 5000);</script>
  `);

  this.resolveToken(req.query);
}

module.exports = async function authMiddleware(req, res, next) {
  if (req.path === "/twitch-auth") {
    twitchAuth.call(this, req, res);
  } else if (req.path === "/twitch-auth/set") {
    twitchAuthSet.call(this, req, res, next);
  }

  next();
};
