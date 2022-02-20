/**
 * Clears the shell.
 * @param  {Msdos} shell - The msdos window.
 */
function cls(shell) {
  $(shell.elem).find('.msdosDisplay').html('');
  shell.addNewInput();
}
