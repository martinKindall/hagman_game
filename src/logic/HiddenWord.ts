
class HiddenWord {
  public state: string[];

  constructor(word: string) {
    this.state = Array(word.length);
  }
}

export default HiddenWord;
