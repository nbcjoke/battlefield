import { Melee } from "../melee";

export class Centaur extends Melee {
  constructor() {
    super();
    this.name = "Centaur";
    this.health = 150;
    this.initiative = 50;
    this.damage = 50;
    this.image =
      "https://www.google.com/search?sxsrf=AB5stBi0CHTqQPABlsxM3O_eZrjylsUIUQ:1688914175780&q=centaur+dota+2&tbm=isch&sa=X&ved=2ahUKEwjdlIPM74GAAxXEFRAIHQ4VBXUQ0pQJegQIDBAB&biw=1920&bih=969&dpr=1#imgrc=_vb41Lfxr_kfKM";
  }
}
