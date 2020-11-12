const mediaPath = "/public/media";

export function createImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload = () => resolve(img);
    img.src = `${mediaPath}/images/${src}`;
  });
}

export function createMedia(type, src) {
  return new Promise((resolve, reject) => {
    const media = document.createElement(type);
    media.onerror = reject;
    media.onloadedmetadata = () => resolve(media);
    media.src = `${mediaPath}/${src}`;
  });
}

export function createAudio(src) {
  return createMedia("audio", `audios/${src}`);
}

export function createVideo(src) {
  return createMedia("video", `videos/${src}`);
}

export function fetchText(src) {
  return fetch(`${mediaPath}/texts/${src}`).then(response => response.text());
}

export async function createText(src) {
  const text = document.createElement("div");
  text.innerText = await fetchText(src);
  return text;
}

export const elementFactories = {
  image: createImage,
  audio: createAudio,
  video: createVideo,
  text: createText,
};
