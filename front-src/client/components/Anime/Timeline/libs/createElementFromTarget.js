import { elementFactories } from "./utils";

export default async function createElementFromTarget(target) {
  const factory = elementFactories[target.type];

  if (!factory) {
    throw new Error(`Undefined type "${target.type}"`);
  }

  return await factory(target.filename);
}
