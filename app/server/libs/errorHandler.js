const { version, bugs } = require("../../package");
const loggers = require("./loggers");
const qs = require("querystring");
const open = require("open");
const path = require("path");
const fs = require("fs");
const os = require("os");

const logger = loggers.get("server");

const issueTemplate = path.resolve(__dirname, "../../ISSUE_TEMPLATE.md");

function errorToString(error) {
  return error instanceof Error ? error.stack : error.toString();
}

function logError(type, error, onError = null) {
  const stack = `${type}: ${errorToString(error)}`;

  logger.error(stack);
  onError && onError(type, error);

  let body = fs.readFileSync(issueTemplate);

  const osVersion = `${os.type()} ${os.release()} ${os.platform()}`;
  body = body.toString().replace("{{os}}", osVersion);
  body = body.replace("{{marv}}", `v${version}`);
  body = body.replace("{{stack}}", stack);

  const title = `${type} ${error.message || ""}`.trim();
  const query = qs.stringify({ title, body });

  open(`${bugs.url}/new?${query}`);
}

function init(onError = null) {
  process.on("uncaughtException", (error) => {
    logError("UncaughtException", error, onError);
  });

  process.on("unhandledRejection", (error) => {
    logError("UnhandledRejection", error, onError);
    setTimeout(() => process.exit(1), 500);
  });
}

module.exports = {
  init,
};
