/**
 * Intializes the game.
 */
function initPong() {
  const board = new Board();
  const playerPaddle = new PlayerPaddle(board);
  const aiPaddle = new AiPaddle(board);
  const ball = new Ball(board);

  playerPaddle.startListeners(board);

  board.renderPaddle(playerPaddle);
  board.renderPaddle(aiPaddle);
  board.renderBall(ball);
  board.init();
}
