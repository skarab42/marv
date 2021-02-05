## [1.4.1](https://github.com/skarab42/marv/compare/v1.3.0...v1.4.1) (2021-02-05)


### Bug Fixes

* Anime tags list ([#136](https://github.com/skarab42/marv/issues/136)) ([ad5c6e9](https://github.com/skarab42/marv/commit/ad5c6e9eb6afad5dd0da52cc149cac63f1018212))
* CORS Allow all origins ([#108](https://github.com/skarab42/marv/issues/108)) ([40fd249](https://github.com/skarab42/marv/commit/40fd249af146aa4cccd1a86732678838eda278fd))
* Quit process behaviour on Mac ([#119](https://github.com/skarab42/marv/issues/119)) ([b9d989b](https://github.com/skarab42/marv/commit/b9d989b281d2f4dab4d800c196363c6d6f6b9e95))
* **overlay:** Add missing escape in regexp ([#97](https://github.com/skarab42/marv/issues/97)) ([73e16e9](https://github.com/skarab42/marv/commit/73e16e9ddb5998a28493558f0b8fce2c5b6bf526))
* **twitch-login:** Fix first login when server port is occupied ([#134](https://github.com/skarab42/marv/issues/134)) ([c2ee324](https://github.com/skarab42/marv/commit/c2ee324a9a97fbf78110122a20c24784c1d23900))


### Features

* **timeline:** Set audio/video duration on first load ([#139](https://github.com/skarab42/marv/issues/139)) ([1a673de](https://github.com/skarab42/marv/commit/1a673de7272ba518553a98f904c9418e17f58a44))
* Add EJS support in anime text file ([#135](https://github.com/skarab42/marv/issues/135)) ([33a7519](https://github.com/skarab42/marv/commit/33a75190659291cd1ad214350d2033fd06456ea9))
* Allow HTML from text file ([#137](https://github.com/skarab42/marv/issues/137)) ([e15cca2](https://github.com/skarab42/marv/commit/e15cca2af9bdf282b1c0bc9bfb16430ca4d8e7d2))
* Twitch auto reconnect and status ([#110](https://github.com/skarab42/marv/issues/110)) ([797da5c](https://github.com/skarab42/marv/commit/797da5c686a74aaadd3e5ab03811fd7d4780dc7d))
* **twitch-api:** Add global file/console logger ([#109](https://github.com/skarab42/marv/issues/109)) ([55e7a17](https://github.com/skarab42/marv/commit/55e7a17ae637e2ce1b1bbfc96c78da799e16f3aa))



# [1.3.0](https://github.com/skarab42/marv/compare/v1.2.2...v1.3.0) (2021-01-23)


### Bug Fixes

* **commands:** Fix empty command message ([57f1973](https://github.com/skarab42/marv/commit/57f1973231eae2ef1e8fcf6c584c210ab7e365d9))
* **overlay:** Fix multiple variables replacement ([452287d](https://github.com/skarab42/marv/commit/452287d16ae46029cf148f3e2c3292bf17da4952))


### Features

* **chat-command:** Add EJS support ([6f8da9f](https://github.com/skarab42/marv/commit/6f8da9fc9fc9d87cb965055387b3d63007deb19c))
* **commands:** Add $user tag for all chat commands ([3f4745c](https://github.com/skarab42/marv/commit/3f4745cbd6a7e96af039817375102c5bc694589b))
* **commands:** Add chat commands ([65e28cb](https://github.com/skarab42/marv/commit/65e28cbae03b09e50a88ea661e2d3437bb3666f0))
* **db:** Add message column to Commands table ([4686d5a](https://github.com/skarab42/marv/commit/4686d5a2c4b0a598bb2bbdff6be4274290f52805))
* **locale:** Update locale ([dcc2e29](https://github.com/skarab42/marv/commit/dcc2e29147249c68f8d6cba426d5b638b1a5a5bc))



## [1.2.2](https://github.com/skarab42/marv/compare/v1.2.1...v1.2.2) (2021-01-22)


### Bug Fixes

* **socketio:** Fix socket.io CORS origins ([717460e](https://github.com/skarab42/marv/commit/717460ed6c841a069b31743bf5a2c56a024bfbe3))



## [1.2.1](https://github.com/skarab42/marv/compare/v1.2.0...v1.2.1) (2021-01-21)


### Bug Fixes

* **locale:** Fix language selection ([d579fa1](https://github.com/skarab42/marv/commit/d579fa14f6ab5f75587f57140d7f4a8e73261225))
* **panel:** Fix undefined current panel when last is removed ([560dc74](https://github.com/skarab42/marv/commit/560dc7430c9bcf1acd00409eaecff51473462a66))
* **path:** Fix app directory case ([0047b90](https://github.com/skarab42/marv/commit/0047b90ead7a8201c28dbb76a4cc3ba016d5b008))
* **ui:** Fix undefined currentPanel ([0918334](https://github.com/skarab42/marv/commit/091833423737f32df0b6116386f7047d71ca58d8))
* **ui:** Fix unsaved change ([e2280af](https://github.com/skarab42/marv/commit/e2280afed52756be19da794cd985e27609c6d567))


### Features

* **dep:** Add svelte-portal ([21ca4b5](https://github.com/skarab42/marv/commit/21ca4b518f87745ae372a324b255f55388468fed))
* **locale:** Add edit grid sentences ([901daea](https://github.com/skarab42/marv/commit/901daea04b89ad334a0e7ecbaf48990b9ed022ad))
* **locale:** Add right click sentences ([5265493](https://github.com/skarab42/marv/commit/526549352a3d243dfe5fc8e037b55606ffd4ad01))
* **locale:** Update sentences ([82c8e0a](https://github.com/skarab42/marv/commit/82c8e0a3c630193b3a8e34878fe0f6503affbaaf))
* **panels:** Add set (panels) method ([9fabd36](https://github.com/skarab42/marv/commit/9fabd3679824cda479e1624bc411c9dcffcd847c))
* **ui:** Add class prop ([e4c2911](https://github.com/skarab42/marv/commit/e4c2911147da15dfd5adf08ed1b18a66958b62ff))
* **ui:** Add class prop ([01f569b](https://github.com/skarab42/marv/commit/01f569b1b7b6ae3b12a22a4edd631472fe8faa3a))
* **ui:** Add click to open right menu message ([548c540](https://github.com/skarab42/marv/commit/548c5407efd031af5062aa9b84be5beda4181ee4))
* **ui:** Add ContexMenu and RenameModal ([4b3624a](https://github.com/skarab42/marv/commit/4b3624a9d4169f7108851ebddeec7838340563dd))
* **ui:** Add ContextMenu component ([8646a1b](https://github.com/skarab42/marv/commit/8646a1bdefb0abc30ec8b2717269d204bea1e4c0))
* **ui:** Add ContextMenu component ([c297c25](https://github.com/skarab42/marv/commit/c297c254b2f3b1337aa2964e74c3feee2b98f108))
* **ui:** Add ContextMenu component ([9afe803](https://github.com/skarab42/marv/commit/9afe803f194490a7b24420d18938c1c04b10d075))
* **ui:** Add contextmenu event ([1d20103](https://github.com/skarab42/marv/commit/1d20103095bfbd6acfc23c2161b546982ebd8b81))
* **ui:** Add item separator ([f189d18](https://github.com/skarab42/marv/commit/f189d189137d8c47045016996c3444a362a1612e))
* **ui:** Add Menu and MenuItem components ([ff8a8da](https://github.com/skarab42/marv/commit/ff8a8da8d65115e181fbf9c3817883e9dce1889c))
* **ui:** Add Modal and RenameModal ([0723858](https://github.com/skarab42/marv/commit/07238583230bbef8c14063a8cb7ceae698e943a0))
* **ui:** Add remove panel in context menu ([8d75c26](https://github.com/skarab42/marv/commit/8d75c262729320e90bdd3b8915a485951309444c))
* **ui:** Add RemoveModal component ([4dcc2f7](https://github.com/skarab42/marv/commit/4dcc2f73a464fdfc52d7ce83eb3f991200b46431))
* **ui:** Add Separator component ([668c178](https://github.com/skarab42/marv/commit/668c178cd08d014acf318d836a8bc3a27b8bd8d0))
* **ui:** Allows changing the order of the panels ([f67689c](https://github.com/skarab42/marv/commit/f67689c65eb685799e158aadbafcc3c0c5291193))
* **ui:** Capitalize menu item ([35759a1](https://github.com/skarab42/marv/commit/35759a103bd879fad2a3eeeb85f9266ccfdb1b53))
* **ui:** Constrains context menu in the window ([824fa61](https://github.com/skarab42/marv/commit/824fa61cc126bddb77b00316ac535b6480b5712f))
* **ui:** Create/Add widget on panel creation ([faed14d](https://github.com/skarab42/marv/commit/faed14de678826e8590a3bd2549cb01305964f71))
* **ui:** Global context menu ([ca2c0f8](https://github.com/skarab42/marv/commit/ca2c0f87dc5b06bac1e0ba4f17e4ddf1eeec6c4e))
* **ui:** Hide context menu item when not usable ([e90af9d](https://github.com/skarab42/marv/commit/e90af9d133b97354bdd7b539348f8cbb32620ed2))
* **ui:** Remove sample code ([f788c42](https://github.com/skarab42/marv/commit/f788c4269197836bb70ff240cd6d8f80a4a321fd))
* **ui:** Remove the edit topbar ([29fa74d](https://github.com/skarab42/marv/commit/29fa74d7de3f2b2ff3e290dfb35e826d64829eb7))
* **ui:** Switch topbars order ([bb53ead](https://github.com/skarab42/marv/commit/bb53eadcd24b55ce12faa79a2a65aae0885c4c6d))
* **ui:** Use app ContextMenu ([e5ec039](https://github.com/skarab42/marv/commit/e5ec0393fdb0d8aaa7afa5114a139c5c5cc9345c))



# [1.1.0](https://github.com/skarab42/marv/compare/v1.0.1...v1.1.0) (2021-01-13)


### Bug Fixes

* **client:** Fix file manager visibility when open from bottom ([adbd287](https://github.com/skarab42/marv/commit/adbd2870b96f807d9687a2dd6380e9518e3ee08e))
* **timeline:** Fix empty file name ([74b4796](https://github.com/skarab42/marv/commit/74b4796a447067ccb22a3bbdff16f3c8d29874fb))
* **timeline:** Fix timeline initial items loading ([5943a86](https://github.com/skarab42/marv/commit/5943a86b0ad697cf0b6be14baa66e43cba8dbda1))


### Features

* **command:** Remove feedback on undefined/disabled command ([fcb5acb](https://github.com/skarab42/marv/commit/fcb5acbc6f08766aaf1c1d7ea8ae57a4043107ac))
* **electron:** Show main window on second instance ([e0c21de](https://github.com/skarab42/marv/commit/e0c21de1526c210c03112f2e9f1e8014bea3b77c))
* **locale:** Add remove action confirmation sentences ([b15b8c4](https://github.com/skarab42/marv/commit/b15b8c4fe255fb66389a65b8e2db55ab12933e61))
* **locale:** Remove undefined/disabled command messages ([a29c887](https://github.com/skarab42/marv/commit/a29c887c527155661fae8646f5fbbf94464250a5))
* **localization:** Remove trailing dot in titles/buttons translations ([a02879e](https://github.com/skarab42/marv/commit/a02879e51966fdc977828e631c5a3d0096fc9c18))
* **path:** Change dev user path ([3d358c0](https://github.com/skarab42/marv/commit/3d358c0ebc1243569fc70d55ca0abc75ac1be9ee))
* **server:** Detect OS language on first start ([76ff78a](https://github.com/skarab42/marv/commit/76ff78a58892d0fcf216d8eb8cba69859e2c8178))
* **twitch-auth:** Set redirect URL from database ([5b3715a](https://github.com/skarab42/marv/commit/5b3715a2ec462d58d63e27934ac10c74b1d3b303))
* **widget:** Add remove action confirmation modal ([f8c4e32](https://github.com/skarab42/marv/commit/f8c4e32dad871aee5ec46f762f5d41133d9faca9))



## [1.0.1](https://github.com/skarab42/marv/compare/v1.0.0...v1.0.1) (2021-01-07)



# [1.0.0](https://github.com/skarab42/marv/compare/v0.16.0...v1.0.0) (2021-01-07)



# [0.16.0](https://github.com/skarab42/marv/compare/v0.15.0...v0.16.0) (2021-01-02)



# [0.15.0](https://github.com/skarab42/marv/compare/v0.14.0...v0.15.0) (2020-12-31)



# [0.14.0](https://github.com/skarab42/marv/compare/v0.13.0...v0.14.0) (2020-12-14)


### Bug Fixes

* boolean value must be set as string ([88cccb1](https://github.com/skarab42/marv/commit/88cccb148dc3cdd188371c1cbb5b1afc840af64e))
* onStart undefined on server restart (dev only) ([5c757d7](https://github.com/skarab42/marv/commit/5c757d7fac1549ba6a56213a56c2c8965f33045f))
* tippy z-index ([e960cb7](https://github.com/skarab42/marv/commit/e960cb741c9db53868beaf46b8da5794dbf94aa0))



# [0.13.0](https://github.com/skarab42/marv/compare/v0.12.0...v0.13.0) (2020-12-11)


### Bug Fixes

* main win created before server started ([33f002f](https://github.com/skarab42/marv/commit/33f002f6e56a6dbecc8d20f9494c274786908714))



# [0.12.0](https://github.com/skarab42/marv/compare/v0.10.1...v0.12.0) (2020-12-10)


### Bug Fixes

* get rewards if affiliat or partner only ([56e0b19](https://github.com/skarab42/marv/commit/56e0b19781e44eec6e2c44e81f10ee7a0364ae62))
* infinit request loop to text file ([3b9faa6](https://github.com/skarab42/marv/commit/3b9faa6faa27a74de03022e3b86fa31d75ce309e))
* pos/size display ([f26c9ce](https://github.com/skarab42/marv/commit/f26c9ced48a31645f1d2e8e89ce24e81756057bb))
* update inverted value ([6b1ba0a](https://github.com/skarab42/marv/commit/6b1ba0aead891fac961b7b8ea7d598f8c969e1e3))



## [0.10.1](https://github.com/skarab42/marv/compare/v0.10.0...v0.10.1) (2020-12-06)


### Bug Fixes

* get all followers only when the db is empty ([fad19b9](https://github.com/skarab42/marv/commit/fad19b9a50d998854052ee9f786ec9b7bc94d3a4))
* get followers when not connected ([3fa476b](https://github.com/skarab42/marv/commit/3fa476b92ebceb3b3e86c5210696194aa8e211aa))
* request twitch api without login ([fe4e168](https://github.com/skarab42/marv/commit/fe4e168be9e469306a532fdc6e96e70518090574))



# [0.10.0](https://github.com/skarab42/marv/compare/v0.9.3...v0.10.0) (2020-12-06)


### Bug Fixes

* create DB on first start ([fb15c2e](https://github.com/skarab42/marv/commit/fb15c2e907206f5013f3c540317cabd5105e378f))
* missing tippy bottom style ([f73c98e](https://github.com/skarab42/marv/commit/f73c98e0869926083284e20de7c18afa046019f4))
* NaN value when not in live ([b27552c](https://github.com/skarab42/marv/commit/b27552c9f3f6b9c2bb5691e5e1bdbfa02f6a1a30))



## [0.9.3](https://github.com/skarab42/marv/compare/v0.9.2...v0.9.3) (2020-12-04)


### Bug Fixes

* offline follow spam ([adbf580](https://github.com/skarab42/marv/commit/adbf5803ea57860ad9f4941d564d02f9d1314ba0))
* update command by id ([b97a8cf](https://github.com/skarab42/marv/commit/b97a8cfad4921dfa79a6234ff60d113acabc64a2))



## [0.9.2](https://github.com/skarab42/marv/compare/v0.9.1...v0.9.2) (2020-12-03)


### Bug Fixes

* update panel after action is removed ([ced7ec6](https://github.com/skarab42/marv/commit/ced7ec6cd1d41968b4702354eefb5a13c4e2fd61))



## [0.9.1](https://github.com/skarab42/marv/compare/v0.9.0...v0.9.1) (2020-11-30)


### Bug Fixes

* decodeURI ([4d47cfc](https://github.com/skarab42/marv/commit/4d47cfc7494fd51be6cc6f73e6cb7b1db96a1e81))
* open minified switch ([7b3e277](https://github.com/skarab42/marv/commit/7b3e27719831561ed02b4ce092cf83531339f0d4))



# [0.9.0](https://github.com/skarab42/marv/compare/v0.8.2...v0.9.0) (2020-11-29)


### Bug Fixes

* add new line at end of the file ([24cc915](https://github.com/skarab42/marv/commit/24cc9159f06dfa3180bbbe1bcbc2be69315a7f68))
* Force window to be shown by default / Add icon for MacOS ([2b0fba5](https://github.com/skarab42/marv/commit/2b0fba5697fb357ad1dcc6ea890a9e2a0f714c56))
* input position ([5afec30](https://github.com/skarab42/marv/commit/5afec3075255618fa894971b7a9272d222b88f42))
* revert `show` to false ([67eac0e](https://github.com/skarab42/marv/commit/67eac0efbbe98b8970ab29f6a9e6904d6df324db))
* single instance lock ([c7cc59e](https://github.com/skarab42/marv/commit/c7cc59e3e513e2f84b0dda2ca26bc4e257690fa9))



## [0.8.2](https://github.com/skarab42/marv/compare/v0.8.1...v0.8.2) (2020-11-27)


### Bug Fixes

* first start info checkbox ([98d92b5](https://github.com/skarab42/marv/commit/98d92b587f07ec81e4e65dc4d819cb567519e9df))
* user display_name ([dc1f610](https://github.com/skarab42/marv/commit/dc1f610eff03d2093efb579a58aa56bef635c663))
* user store undefined when never logged to Twitch ([337aca9](https://github.com/skarab42/marv/commit/337aca952573e18621e797ae9f207969d844182c))



## [0.8.1](https://github.com/skarab42/marv/compare/v0.8.0...v0.8.1) (2020-11-27)



# [0.8.0](https://github.com/skarab42/marv/compare/v0.7.0...v0.8.0) (2020-11-27)


### Reverts

* Revert "add db path" ([dd98ff6](https://github.com/skarab42/marv/commit/dd98ff6862f41441ed95e5babd5d5b3a51099294))



# [0.7.0](https://github.com/skarab42/marv/compare/v0.6.1...v0.7.0) (2020-11-26)



## [0.6.1](https://github.com/skarab42/marv/compare/v0.6.0...v0.6.1) (2020-11-26)


### Reverts

* Revert "v0.6.0" ([d53c0ff](https://github.com/skarab42/marv/commit/d53c0ffcf9cb0dcd4da6946250ed7f83b1119532))
* Revert "v0.6.0" ([5855aed](https://github.com/skarab42/marv/commit/5855aed356dd54a3f29015ed4ae80cfe3704a0dd))



# [0.6.0](https://github.com/skarab42/marv/compare/v0.5.0...v0.6.0) (2020-11-26)


### Bug Fixes

* avoid chat reload when no channel change ([3854158](https://github.com/skarab42/marv/commit/38541588f8bb777dc13bb8a44798978d00b93137))
* get stream return null ([e40a404](https://github.com/skarab42/marv/commit/e40a404c24c44fb6ccdc4c4dc5d72c8b1f252dab))
* input spacing ([8e9a4f5](https://github.com/skarab42/marv/commit/8e9a4f59312526cce5fe915eeef275f490779124))
* modal top offset when in electron window ([25d9505](https://github.com/skarab42/marv/commit/25d9505a65ef1923017c8c342d4041e566bbe9d6))
* modal top offset when in electron window ([c9b2da4](https://github.com/skarab42/marv/commit/c9b2da4f9676cb3ca5d4f9157c4242e0f57dd179))
* stream update ([10bb871](https://github.com/skarab42/marv/commit/10bb8710497454fa07822095bc13ed522162a777))
* systray icon for window OS ([bd8db9a](https://github.com/skarab42/marv/commit/bd8db9ac499dd4ab66799970db3bae504c84742e))
* unused prop ([d26b212](https://github.com/skarab42/marv/commit/d26b21250fa2aabaae91184282263c4bc5825f41))
* version number up to date ([779e676](https://github.com/skarab42/marv/commit/779e6769cecacbbdc96de8d7268d70e2f4ae5c6a))
* widget config / clone deep ([c0e70a7](https://github.com/skarab42/marv/commit/c0e70a76c534da9315fd415a22f9ecab7bf9c2e0))



# [0.5.0](https://github.com/skarab42/marv/compare/v0.4.4...v0.5.0) (2020-11-24)


### Bug Fixes

* drawer top offset when in electron win ([d695100](https://github.com/skarab42/marv/commit/d695100e2fc516c364ff0d759f3e3e76c59e4e04))
* hide input checkbox ([aa2d770](https://github.com/skarab42/marv/commit/aa2d77085489b40561f11fcca891c45a35eca156))
* missing default value argument ([b19b73a](https://github.com/skarab42/marv/commit/b19b73a85215071c04b79712dc97515784c9c8da))
* remove file ([151f06b](https://github.com/skarab42/marv/commit/151f06b82e991cc686e6d59df5a4cf7d3f73d368))
* undefined anime duration ([5b40a82](https://github.com/skarab42/marv/commit/5b40a8246356e0228ab2e0445b784e7bdf158de1))
* widget spiner offset ([c5f852e](https://github.com/skarab42/marv/commit/c5f852eee0a2de4b37764a7bf5326366c610101d))



## [0.4.4](https://github.com/skarab42/marv/compare/v0.4.3...v0.4.4) (2020-11-20)



## [0.4.3](https://github.com/skarab42/marv/compare/v0.4.2...v0.4.3) (2020-11-20)



## [0.4.2](https://github.com/skarab42/marv/compare/v0.4.1...v0.4.2) (2020-11-20)



## [0.4.1](https://github.com/skarab42/marv/compare/v0.4.0...v0.4.1) (2020-11-20)



# [0.4.0](https://github.com/skarab42/marv/compare/v0.3.3...v0.4.0) (2020-11-20)


### Bug Fixes

* build tailwind before runing watch mode ([0c55a4b](https://github.com/skarab42/marv/commit/0c55a4b8d2e854532ed0c1f530cab4d7c9cbdc20))
* client URL ([1d8a43c](https://github.com/skarab42/marv/commit/1d8a43cd47719ba26f6c96a0b5aace26084591ce))
* remove actions when widget/panel removed ([d6aa5c5](https://github.com/skarab42/marv/commit/d6aa5c57bc8dd9c9ec5d7586d9e1fe228f01bcdc))
* removed absolute paths from stores ([7e84e27](https://github.com/skarab42/marv/commit/7e84e273007e0079d77110feb337e94ff18db619))
* tailwind build order ([b91c552](https://github.com/skarab42/marv/commit/b91c552370e43b5128f55ec5bb7c89d1a27f8b2b))



## [0.3.3](https://github.com/skarab42/marv/compare/v0.3.2...v0.3.3) (2020-11-19)



## [0.3.2](https://github.com/skarab42/marv/compare/v0.3.1...v0.3.2) (2020-11-19)



# [0.3.0](https://github.com/skarab42/marv/compare/b4f190ef7641c5260cf24de813d622a914a63809...v0.3.0) (2020-11-19)


### Bug Fixes

* app quit ([2396fb5](https://github.com/skarab42/marv/commit/2396fb5d0428124d196b437a00be36b8469c49a8))
* destroy modal on conexion lost ([fd94e73](https://github.com/skarab42/marv/commit/fd94e73e59b7a5801baf944847ab5b8bfb193c0c))
* empty scene ([4cccb02](https://github.com/skarab42/marv/commit/4cccb02098aaaf9938ad315dd6d42a944de0c78c))
* i18n ([8ba2806](https://github.com/skarab42/marv/commit/8ba280629110f0353c50d7d41691a4ca97fc7b60))
* i18n prefix ([b441832](https://github.com/skarab42/marv/commit/b441832fe8615741da722cdc264d577e6d99025d))
* missing input attr -> accept ([07df5f2](https://github.com/skarab42/marv/commit/07df5f25c71b79241f20fec8484074f700d79788))
* panel update ([4d25121](https://github.com/skarab42/marv/commit/4d25121521fe67a3b3a4b2aaf1ad9983976e6ea6))
* passive event and stop propagation ([b4f190e](https://github.com/skarab42/marv/commit/b4f190ef7641c5260cf24de813d622a914a63809))
* responsive ([fba71c7](https://github.com/skarab42/marv/commit/fba71c7820cba7a00fb8ec605e572e66763cd15c))
* responsive ([c3c2a11](https://github.com/skarab42/marv/commit/c3c2a1152b54429f7e97fee74c08c13637f64ad6))
* timeline min/max seek ([55b1dd8](https://github.com/skarab42/marv/commit/55b1dd8fb52665a6af6652d6055259fa3075d8b1))
* timeline seek and out ouf range visibility ([dc20100](https://github.com/skarab42/marv/commit/dc20100ae6e214c25f32223849fd2ff77cfa198d))
* timeline text update ([cb701d4](https://github.com/skarab42/marv/commit/cb701d45d35e64c0884b3f575f79553efa9c4320))
* undefined panel id when no panel is selected ([3739f37](https://github.com/skarab42/marv/commit/3739f374413fbe9f7f05e1e06b1e08ed2f373f42))
* undefined wrapper !!! ([6fb9a4a](https://github.com/skarab42/marv/commit/6fb9a4af04bb0988e223f5d319cb1fb23015265f))
* undefined wrapper on resize !?!? ([0b60024](https://github.com/skarab42/marv/commit/0b60024ce8edefddd89f788cda4661b284150283))
* upload path ([cc39adb](https://github.com/skarab42/marv/commit/cc39adba0b6e7152a49845c91a9de94858d940c3))
* widget label i18n ([105d8f9](https://github.com/skarab42/marv/commit/105d8f9249f4cade3c3c2dc22d348973ea574680))



