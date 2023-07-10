import { Melee } from "../melee";

export class Sceleton extends Melee {
  constructor() {
    super();
    this.name = "Sceleton";
    this.health = 100;
    this.initiative = 50;
    this.damage = 25;
    this.image =
      "https://www.google.com/search?sxsrf=AB5stBhbmthprgoa04TXOS0edpf51DEx-A:1688913495012&q=skeleton+dota+2&tbm=isch&sa=X&ved=2ahUKEwiKtLSH7YGAAxWIgSoKHYF3B4EQ0pQJegQICxAB&biw=1920&bih=969&dpr=1#imgrc=s5AxD-yeWQw2DM";
  }
}
