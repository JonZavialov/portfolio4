/**
 * Displays the help menu.
 * @param  {Msdos} shell - The msdos window.
 * @param  {String[]} args - The arguments passed to the command.
 */
function help(shell, args) {
  $.getJSON('/assets/json/msdos.json', (data) => {
    let helpString = '';

    if (args.length === 0) {
      helpString +=
        'To see a description of a command, type "help {command}".<br>';

      const commands = Object.keys(data);
      for (let i = 0; i < commands.length; i += 1) {
        const command = commands[i];
        helpString += `${command.toUpperCase()} - ${data[command].desc}<br>`;
      }
    } else {
      const command = args[0];
      if (data[command]) {
        const commandObj = data[command];
        helpString += `${command.toUpperCase()} - ${commandObj.desc}`;
        if (commandObj.args) {
          const argsKeys = Object.keys(commandObj.args);
          helpString += '<br>Arguments:<br>';
          for (let i = 0; i < argsKeys.length; i += 1) {
            helpString += `${argsKeys[i]} - ${
              commandObj.args[argsKeys[i]].desc
            }<br>`;
            helpString += `OPTIONAL=${
              commandObj.args[argsKeys[i]].optional
            }<br>`;
          }
        }
      } else {
        shell.throwCmdError(command);
        return;
      }
    }

    shell.output(helpString);
  });
}
