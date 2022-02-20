/**
 * Displays the current date and time.
 * @param  {Msdos} shell - The msdos window.
 */
function date(shell) {
  shell.output(new Date().toLocaleString());
}
