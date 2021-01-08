import api from "@/api/app";

export default async function getFonts() {
  return await api.getFonts();
}
