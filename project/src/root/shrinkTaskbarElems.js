/**
 * Shrinks icons to make more room in the taskbar.
 */
function shrinkTaskbarElems() {
  if (taskbarShrinkNum === 100) taskbarShrinkNum = windowsTaskbarMap.size;
  $('.taskbar-element').each((_i, elem) => {
    $(elem).find('p').hide();
  });
}
