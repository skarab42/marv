module.exports = function setting(key, value, type) {
  const now = new Date();
  return { key, value, type, createdAt: now, updatedAt: now };
};
