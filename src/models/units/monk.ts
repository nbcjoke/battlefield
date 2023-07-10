import { Healer } from "../healer";

export class Monk extends Healer {
  constructor() {
    super();
    this.name = "Monk";
    this.health = 90;
    this.initiative = 20;
    this.heal = 40;
    this.image =
      "https://www.google.com/search?q=monkey+dota+2&tbm=isch&ved=2ahUKEwikhqin8IGAAxWSposKHXfGBl4Q2-cCegQIABAA&oq=monkey+dota+2&gs_lcp=CgNpbWcQAzIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeOgQIIxAnOgUIABCABDoHCAAQigUQQ1DRCFjFKGCTKWgBcAB4AIABrwGIAasHkgEDNy4ymAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=v8mqZOSqDZLNrgT3jJvwBQ&bih=969&biw=1920#imgrc=M79dlIQXPmTVWM";
  }
}
