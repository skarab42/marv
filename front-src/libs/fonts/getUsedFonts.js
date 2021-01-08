import api from "@/api/app";

export default async function getUsedFonts() {
  return await api.getUsedFonts();
}
