/**
   * Called when the icon is focused and then the enter key is pressed.
   * Acts the same as a mouse click.
   * @param  {HTMLElement} elem - The element that is focused.
   * @param {KeyboardEvent} e - The keyboard event.
   */
function openFocusedApp(elem, e){
    iconClasses.forEach(icon => {
        if (icon.parent === "desktop" && elem.classList[0] === icon.className) icon.onClick(e)
    });
}