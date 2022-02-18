/**
 * Closes all windows.
 */
function closeAllWindows() {
  const iterator = windowsTaskbarMap.values();
  for (let i = 0; i < windowsTaskbarMap.size; i += 1)
    iterator.next().value.windows.forEach((window) => {
      !window.closeFunction ? window.close() : window.closeFunction();
    });
  if (windowsTaskbarMap.size !== 0) closeAllWindows(); // necessary due to map-index shifting
}
