import io from "../../libs/socket.io";

export const { on, emit } = io("/overlay");
