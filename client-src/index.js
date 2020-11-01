"use strict";

import io from "@/libs/socket.io";
import App from "@/components/App.svelte";

io();

new App({ target: document.body });
