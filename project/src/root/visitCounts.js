/**
 * Updates the visit count for the current user.
 * @param  {string} uuid - The UUID of the user.
 */
function updateVisits(uuid) {
  $.ajax({
    type: 'POST',
    url: 'https://api.jonzav.me/v1/analytics/addvisit',
    data: {
      uuid,
    },
  });
}

/**
 * Creates a new counter for the current user in the backend.
 * @param  {string} uuid - The UUID of the user.
 */
function createNewVisit(uuid) {
  $.ajax({
    type: 'POST',
    url: 'https://api.jonzav.me/v1/analytics/newuser',
    data: {
      uuid,
    },
  });
}
