import createElementFromTarget from "./createElementFromTarget";

export default async function getTargetInfo(target) {
  const element = await createElementFromTarget(target);
  const info = {};

  if (target.type === "image") {
    info.width = element.width;
    info.height = element.height;
  } else if (target.type === "video") {
    info.width = element.videoWidth;
    info.height = element.videoHeight;
  } else if (target.type === "text") {
    info.length = element.innerText.length;
  }

  if (target.type === "audio" || target.type === "video") {
    info.duration = Math.round(element.duration * 1000);
  }

  return info;
}
