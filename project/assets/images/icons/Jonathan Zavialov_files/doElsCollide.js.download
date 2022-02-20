/**
 * Returns whether two elements collide.
 * @param  {jQuery} $div1 - The first element.
 * @param  {jQuery} $div2 - The second element.
 * @returns {boolean} - Whether the two elements collide.
 */
function doElsCollide($div1, $div2) {
  if ($div1.length === 0 || $div2.length === 0) return false;

  // Div 1 data
  const d1Offset = $div1.offset();
  const d1Height = $div1.outerHeight();
  const d1Width = $div1.outerWidth();
  const d1DistanceFromTop = d1Offset.top + d1Height;
  const d1DistanceFromLeft = d1Offset.left + d1Width;

  // Div 2 data
  const d2Offset = $div2.offset();
  const d2Height = $div2.outerHeight();
  const d2Width = $div2.outerWidth();
  const d2DistanceFromTop = d2Offset.top + d2Height;
  const d2DistanceFromLeft = d2Offset.left + d2Width;

  const notColliding =
    d1DistanceFromTop < d2Offset.top ||
    d1Offset.top > d2DistanceFromTop ||
    d1DistanceFromLeft < d2Offset.left ||
    d1Offset.left > d2DistanceFromLeft;

  // Return whether it IS colliding
  return !notColliding;
}
