/**
 * Makes Clippy show the chat room.
 */
function clippyShowChat() {
    $('.clippy-balloon').hide();
    const coords = $('.chatRoomIcon')[0].getBoundingClientRect();
    clippyAgent.moveTo(coords.x - 110, coords.y - 15);
    clippyAgent.play('GestureLeft');
    clippyAgent.speak(
        'If you have a GitHub account, you can talk in the chat room!'
    );
    setTimeout(() => addSpeechButton(clippyShowSettings), 5000);
}