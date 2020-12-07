import axios from "axios";
import api from "@/api/app";

const extsToOS = {
  deb: "linux",
  exe: "win32",
  pkg: "darwin",
};

export default function getLastRelease(repo) {
  const url = `https://api.github.com/repos/${repo}/releases/latest`;
  return axios.get(url).then(async (res) => {
    const exts = {};

    res.data.assets.forEach((asset) => {
      const url = asset.browser_download_url;
      const ext = url.split(".").pop();
      exts[extsToOS[ext]] = url;
    });

    return { version: res.data.tag_name, url: exts[await api.getOS()] };
  });
}
