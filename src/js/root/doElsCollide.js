/**
 * Returns whether two elements collide.
 * @param  {jQuery} $div1 - The first element.
 * @param  {jQuery} $div2 - The second element.
 * @returns {boolean} - Whether the two elements collide.
 */
function doElsCollide($div1, $div2) {
  if ($div1.length == 0 || $div2.length == 0) return false;

  // Div 1 data
  var d1_offset = $div1.offset();
  var d1_height = $div1.outerHeight();
  var d1_width = $div1.outerWidth();
  var d1_distance_from_top = d1_offset.top + d1_height;
  var d1_distance_from_left = d1_offset.left + d1_width;

  // Div 2 data
  var d2_offset = $div2.offset();
  var d2_height = $div2.outerHeight();
  var d2_width = $div2.outerWidth();
  var d2_distance_from_top = d2_offset.top + d2_height;
  var d2_distance_from_left = d2_offset.left + d2_width;

  var not_colliding =
    d1_distance_from_top < d2_offset.top ||
    d1_offset.top > d2_distance_from_top ||
    d1_distance_from_left < d2_offset.left ||
    d1_offset.left > d2_distance_from_left;

  // Return whether it IS colliding
  return !not_colliding;
}
