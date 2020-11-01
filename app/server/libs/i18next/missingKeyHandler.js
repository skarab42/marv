module.exports = function missingKeyHandler(i18next) {
  return (req, res) => {
    const { lng, ns } = req.params;

    if (!i18next.services.backendConnector) {
      res.statusCode = 404;
      res.end("i18next: no backend configured");
      return;
    }

    for (let m in req.body) {
      const v = req.body[m];
      if (i18next.options.saveMissingTo === "all") {
        i18next.options.supportedLngs
          .filter((language) => {
            return language !== "cimode";
          })
          .forEach((lng) => {
            i18next.services.backendConnector.saveMissing([lng], ns, m, v);
          });
      } else {
        i18next.services.backendConnector.saveMissing([lng], ns, m, v);
      }
    }

    res.end("ok");
  };
};
