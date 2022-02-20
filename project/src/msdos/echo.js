/**
 * Displays the given text in the shell.
 * @param  {Msdos} shell - The msdos window.
 * @param  {args} args - The words to display.
 */
function echo(shell, args) {
  let echoString = '';
  for (let i = 0; i < args.length; i += 1) echoString += `${args[i]} `;

  shell.output(echoString);
}
