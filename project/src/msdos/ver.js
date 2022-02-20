/**
 * Displays the current version of the shell.
 * @param  {Msdos} shell - The msdos window.
 */
function ver(shell) {
  $.getJSON(
    'https://api.github.com/repos/JonZavialov/portfolio4/branches/main',
    (data) => {
      shell.output(
        `JonZav OS<br>Last updated - ${data.commit.commit.author.date}<br>Update message - ${data.commit.commit.message}`
      );
    }
  );
}
