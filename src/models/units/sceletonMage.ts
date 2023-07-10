import { Mage } from "../mage";

export class SceletonMage extends Mage {
  constructor() {
    super();
    this.name = "SceletonMage";
    this.health = 50;
    this.initiative = 40;
    this.damage = 20;
    this.image =
      "https://www.google.com/search?sxsrf=AB5stBithaWUqnnFQjE9PHM9SipD_6GUTg:1688914212126&q=creep+dota+2&tbm=isch&sa=X&ved=2ahUKEwjYz63d74GAAxWGFBAIHetsCscQ0pQJegQIChAB&biw=1920&bih=969&dpr=1#imgrc=X5cbFD8WoazbOM";
  }
}
