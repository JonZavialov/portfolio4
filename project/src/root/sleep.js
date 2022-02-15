/**
 * Sleeps for a given amount of ms.
 * @param  {number} ms - The amount of ms to sleep.
 */
async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve();
    }, ms);
  });
}