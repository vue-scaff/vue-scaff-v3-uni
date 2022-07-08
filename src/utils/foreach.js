export default (target = {}, callback = () => {}) => {
  // Set Group
  const group = {};

  // Loop
  Object.keys(target).every((key) => {
    // Get Result from Callback
    const result = callback(target[key], key);

    // Stop
    if (result === false) {
      return result;
    }

    // Reset Target
    group[key] = result;

    // Next
    return true;
  });

  // Export
  return group;
};
