/**
 * Checks if the user is visiting for the first time using system cookies.
 */
function initCookies() {
  getBrowserUUID()
    .then((uuid) => {
      // The user is not unique
      updateUUID(uuid);
      updateVisits(uuid);
    })
    .catch(() => {
      // The user is unique
      const uuid = crypto.randomUUID();
      updateUUID(uuid);
      createNewVisit(uuid);
    });
}

/**
 * Checks the browser's cookies for the UUID.
 * @returns  {Promise} - A promise that resolves with the UUID.
 */
function getBrowserUUID() {
  return new Promise((resolve, reject) => {
    const cookies = decodeURIComponent(document.cookie).split(';');
    cookies.forEach((cookie) => {
      const cookieParts = cookie.split('=');
      if (cookieParts[0].indexOf('uuid') !== -1 && cookieParts[1] !== '')
        resolve(cookieParts[1]);
    });
    reject();
  });
}

/**
 * Stores the UUID in the browser's cookies.
 * If the UUID is already stored, the expiration date will be updated.
 * @param  {string} uuid - The UUID to store.
 */
function updateUUID(uuid) {
  // Build the expiration date string:
  const expirationDate = new Date();
  let cookieString = '';
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  // Build the set-cookie string:
  cookieString = `uuid=${uuid}; path=/; expires=${expirationDate.toUTCString()}`;

  // Create or update the cookie:
  document.cookie = cookieString;
}
