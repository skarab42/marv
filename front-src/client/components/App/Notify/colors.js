const colors = {
  info: "bg-gray-300 text-gray-800",
  success: "bg-green-700 text-gray-300",
  warning: "bg-orange-600 text-gray-300",
  error: "bg-red-700 text-gray-300",
};

const iconColors = {
  info: "text-gray-800",
  success: "text-green-700",
  warning: "text-orange-600",
  error: "text-red-700",
};

export function color(type) {
  return colors[type] || colors.info;
}

export function iconColor(type) {
  return iconColors[type] || colors.info;
}
