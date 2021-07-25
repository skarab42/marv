# Changelog

## v1.9.0 (2021-07-25)

### Features

- random action (#269) (eaf4847)
- async ejs support (#268) (71143fd)

---

## v1.8.0 (2021-07-24)

### Features

- Store fullscreen state (#240) (9687a0a)

### Bug Fixes

- non fatal error (#261) (d4d6367)
- **timeline:** Sortable item order (#241) (abdd1f2)

---

## v1.7.0 (2021-03-30)

### Features

- **OBS:** Edit port and password (#238) (357984f)
- Add remove confirm modal on command and event (#237) (dafa53b)
- **timeline:** Reverse item order (#236) (5a97e52)
- Conditional event and command (#235) (fd133b9)
- Add quit button in main menu (#210) (4b00069)
- OBS audio volume widget (#201) (4662d73)
- Set widget min size when selected (#184) (3808fda)
- OBS toggle audio source (#183) (4c23b01)
- Conditional commands (#182) (c490b6b)
- Add channel:read:subscriptions scope (#176) (6328118)
- Conditional events (#175) (0385b3a)

### Bug Fixes

- Boolen tags in text file (#219) (53e4a27)
- Twitch (chat) login in electron (#218) (fcfa190)
- User not resolved after seconds call (#216) (64589ff)
- Encode the entire URI used to login with Twitch (#214) (56a861b)
- Remove SIGKILL signal handler (#212) (3bb7118)
- User auto reconnect (#209) (fc2cadb)
- Pubsub auto reconnect (#208) (7d87e4b)
- Chat auto reconnect (#207) (07dcf93)
- Color picker (#202) (87bb79c)
- Event trigger update (#178) (8fbe78b)
- **dev:** Main window open on save (#177) (6ce24ce)

---

## v1.6.0 (2021-02-23)

### Features

- **timeline:** Anime preview by event type (#163) (e37e5b1)
- Improved input/select UI (#162) (49874ca)
- Widget multi events support (#161) (c56cec8)
- Add global shortcuts to trigger action (#160) (7346786)
- **timeline:** Duplicate asset (#159) (16a1fa0)
- **timeline:** Invert zoom direction (#157) (5a2c08c)
- **timeline:** Update asset (#156) (d558065)
- Remove unused files option (#155) (9944bc1)

---

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

