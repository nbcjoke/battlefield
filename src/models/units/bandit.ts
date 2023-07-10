import { Range } from "../range";

export class Bandit extends Range {
  constructor() {
    super();
    this.name = "Bandit";
    this.health = 75;
    this.initiative = 60;
    this.damage = 30;
    this.image =
      "https://www.google.com/search?sxsrf=AB5stBithaWUqnnFQjE9PHM9SipD_6GUTg:1688914212126&q=creep+dota+2&tbm=isch&sa=X&ved=2ahUKEwjYz63d74GAAxWGFBAIHetsCscQ0pQJegQIChAB&biw=1920&bih=969&dpr=1#imgrc=iB05wpBSYIBADM";
  }
}
