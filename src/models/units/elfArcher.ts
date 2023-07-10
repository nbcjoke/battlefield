import { Range } from "../range";

import elfArcher from "../../assets/images/elfArcher.jpg";

export class ElfArcher extends Range {
  constructor() {
    super();
    this.name = "ElfArcher";
    this.health = 90;
    this.initiative = 60;
    this.damage = 45;
    this.image = elfArcher;
  }
}
