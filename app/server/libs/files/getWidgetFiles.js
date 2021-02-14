function getWidgetFiles({ widget, action }) {
  const files = [];

  if (widget.backgroundImage) {
    files.push(widget.backgroundImage);
  }

  action &&
    action.items.forEach(({ target }) => {
      files.push(target.filename);
    });

  return files;
}

module.exports = getWidgetFiles;
