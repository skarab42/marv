# Changelog

## v1.5.1 (2021-02-13)

### Bug Fixes

- Chat already connected (#153) (e3af5da)

---

## v1.5.0 (2021-02-13)

### Features

- Add logger (#151) (7c294bb)
- Import/Export Panels and widgets (#150) (a46e756)

### Bug Fixes

- File manager refresh (#147) (9610902)
- Kill HTTP server on app quit (#143) (57b01f2)

---

## v1.4.1 (2021-02-05)

### Features

- **timeline:** Set audio/video duration on first load (#139) (1a673de)

### Bug Fixes

- Quit process behaviour on Mac (#119) (b9d989b)

---

## v1.4.0 (2021-02-03)

### Features

- Allow HTML from text file (#137) (e15cca2)
- Add EJS support in anime text file (#135) (33a7519)
- Twitch auto reconnect and status (#110) (797da5c)
- **twitch-api:** Add global file/console logger (#109) (55e7a17)

### Bug Fixes

- Anime tags list (#136) (ad5c6e9)
- **twitch-login:** Fix first login when server port is occupied (#134) (c2ee324)
- CORS Allow all origins (#108) (40fd249)

---

## v1.3.1 (2021-01-24)

### Bug Fixes

- **overlay:** Add missing escape in regexp (#97) (73e16e9)

---

## v1.3.0 (2021-01-23)

### Features

- **chat-command:** Add EJS support (6f8da9f)
- **commands:** Add $user tag for all chat commands (3f4745c)
- **commands:** Add chat commands (65e28cb)
- **locale:** Update locale (dcc2e29)
- **db:** Add message column to Commands table (4686d5a)

### Bug Fixes

- **commands:** Fix empty command message (57f1973)
- **overlay:** Fix multiple variables replacement (452287d)

---

## v1.2.2 (2021-01-22)

### Bug Fixes

- **socketio:** Fix socket.io CORS origins (717460e)

---

## v1.2.1 (2021-01-21)

### Bug Fixes

- **path:** Fix app directory case (0047b90)

---

## v1.2.0 (2021-01-21)

### Features

- **panels:** Add set (panels) method (9fabd36)
- **ui:** Add click to open right menu message (548c540)
- **locale:** Add right click sentences (5265493)
- **ui:** Create/Add widget on panel creation (faed14d)
- **ui:** Remove the edit topbar (29fa74d)
- **ui:** Hide context menu item when not usable (e90af9d)
- **ui:** Global context menu (ca2c0f8)
- **ui:** Add item separator (f189d18)
- **ui:** Capitalize menu item (35759a1)
- **ui:** Remove sample code (f788c42)
- **ui:** Add class prop (e4c2911)
- **ui:** Add Separator component (668c178)
- **locale:** Add edit grid sentences (901daea)
- **ui:** Constrains context menu in the window (824fa61)
- **ui:** Use app ContextMenu (e5ec039)
- **ui:** Add ContextMenu component (8646a1b)
- **ui:** Add remove panel in context menu (8d75c26)
- **locale:** Update sentences (82c8e0a)
- **ui:** Add RemoveModal component (4dcc2f7)
- **ui:** Add ContexMenu and RenameModal (4b3624a)
- **ui:** Add Menu and MenuItem components (ff8a8da)
- **ui:** Add ContextMenu component (c297c25)
- **ui:** Add Modal and RenameModal (0723858)
- **ui:** Add class prop (01f569b)
- **ui:** Add ContextMenu component (9afe803)
- **ui:** Add contextmenu event (1d20103)
- **dep:** Add svelte-portal (21ca4b5)
- **ui:** Switch topbars order (bb53ead)
- **ui:** Allows changing the order of the panels (f67689c)

### Bug Fixes

- **ui:** Fix unsaved change (e2280af)
- **ui:** Fix undefined currentPanel (0918334)
- **panel:** Fix undefined current panel when last is removed (560dc74)
- **locale:** Fix language selection (d579fa1)

---

## v1.1.0 (2021-01-13)

### Features

- **widget:** Add remove action confirmation modal (f8c4e32)
- **locale:** Add remove action confirmation sentences (b15b8c4)
- **twitch-auth:** Set redirect URL from database (5b3715a)
- **path:** Change dev user path (3d358c0)
- **locale:** Remove undefined/disabled command messages (a29c887)
- **command:** Remove feedback on undefined/disabled command (fcb5acb)
- **localization:** Remove trailing dot in titles/buttons translations (a02879e)
- **server:** Detect OS language on first start (76ff78a)
- **electron:** Show main window on second instance (e0c21de)

### Bug Fixes

- **timeline:** Fix timeline initial items loading (5943a86)
- **timeline:** Fix empty file name (74b4796)
- **client:** Fix file manager visibility when open from bottom (adbd287)

---

