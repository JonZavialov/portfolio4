function updateVisits(uuid) {
  $.ajax({
    type: 'POST',
    url: 'https://api.jonzav.me/v1/analytics/addvisit',
    data: {
      uuid,
    },
  });
}

function createNewVisit(uuid) {
  $.ajax({
    type: 'POST',
    url: 'https://api.jonzav.me/v1/analytics/newuser',
    data: {
      uuid,
    },
  });
}
