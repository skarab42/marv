const { getServerURL } = require("../../server/utils");

module.exports = async ({ win, title }) => {
  const serverURL = await getServerURL();

  win.webContents.insertCSS(`
    #root > div.tw-top-0 {
      top: 30px !important;
    }
    #electron-titlebar {
      display: flex;
      font-size: 14px;
      user-select: none;
      align-items: center;
      color: rgb(226, 232, 240);
      background-color: rgb(26, 32, 44);
    }
    #electron-titlebar > div {
      display: flex;
      height: 29px;
      padding-left: 8px;
      padding-right: 8px;
      align-items: center;
    }
    #electron-titlebar > div.icon {
      display: flex;
    }
    #electron-titlebar > div.title {
      padding: 1px 0;
      flex: 1 1 auto;
      display: flex;
      height: 24px;
    }
    #electron-titlebar > div.title > div {
      flex: 1 1 auto;
      -webkit-app-region: drag;
    }
    #electron-titlebar > div.cross {
      cursor: pointer;
    }
    #electron-titlebar > div.cross:hover {
      background-color: rgb(197, 48, 48);
    }
  `);

  win.webContents.executeJavaScript(`
    const $html = document.querySelector("html");
    const $body = document.querySelector("body");
    $html.classList.toggle("tw-root--theme-dark", true);
    $html.classList.toggle("tw-root--theme-light", false);
    const $titlebar = document.createElement('div');
    const $icon = document.createElement('div');
    const $title = document.createElement('div');
    const $cross = document.createElement('div');
    const $iconSVG = document.createElement('img');
    $titlebar.setAttribute('id', 'electron-titlebar');
    $iconSVG.setAttribute('src', '${serverURL}/icon.svg');
    $iconSVG.setAttribute('height', '16px');
    $icon.classList.add('icon');
    $title.classList.add('title');
    $cross.classList.add('cross');
    $icon.append($iconSVG);
    $title.innerHTML = '<div>${title}</div>';
    $cross.innerHTML = '✕';
    $titlebar.append($icon, $title, $cross);
    $cross.addEventListener('click', () => window.close());
    $body.prepend($titlebar);
  `);
};
