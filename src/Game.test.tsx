
test('Game initialization rules', () => {
  const secretWord = "paralelepipedo";
  const game = new HangmanGame(secretWord);

  expect(game.livesRemaining).toBe(HangmanRules.maxLives);

  const emptyArray = Array(secretWord.length);
  expect(game.currentWordState.length).toBe(emptyArray.length);
  game.currentWordState.forEach((character: undefined) => {
    expect(character).toBeUndefined();
  });
});
