import { Range } from "../range";

export class ElfArcher extends Range {
  constructor() {
    super();
    this.name = "ElfArcher";
    this.health = 90;
    this.initiative = 60;
    this.damage = 45;
    this.image =
      "https://www.google.com/search?sxsrf=AB5stBjiX-dL5uCdbv7NgLsk5wMA31EF5w:1688914267082&q=elf+dota+2&tbm=isch&sa=X&ved=2ahUKEwi45cf374GAAxVXHRAIHYNyBIcQ0pQJegQICBAB&biw=1920&bih=969&dpr=1#imgrc=Fm3sJpQXcY0e0M";
  }
}
