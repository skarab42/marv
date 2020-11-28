module.exports = function getTrayIconByPlatform() {
  let icon;
  switch (process.platform) {
    default:
      icon = 'icon.png';
      break;
    case 'win32':
      icon = 'icon.ico';
      break;
    case "darwin":
      icon = 'icon_macos.png';
      break;
  }

  return icon
}