import api from "@/api/panels";
import gridHelper from "svelte-grid/src/utils/helper";
import { get } from "svelte/store";
import {
  setEditMode,
  currentPanel,
  gridOptions,
  itemOptions,
} from "@/stores/panels";

export default async function addWidget() {
  const cp = get(currentPanel);
  const cols = get(gridOptions).cols;
  const grid = cp.grid;
  const item = gridHelper.item(get(itemOptions));
  const pos = gridHelper.findSpaceForItem(item, grid, cols);
  await api.addWidget(cp, { w: item.w, h: item.h, ...pos });
  setEditMode(true);
}
