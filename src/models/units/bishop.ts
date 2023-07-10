import { Healer } from "../healer";

export class Bishop extends Healer {
  constructor() {
    super();
    this.name = "Bishop";
    this.health = 130;
    this.initiative = 20;
    this.heal = 25;
    this.image =
      "https://www.google.com/search?q=bishop+chess&tbm=isch&ved=2ahUKEwi5lKG68IGAAxXDEBAIHRXkBJEQ2-cCegQIABAA&oq=bishop+&gs_lcp=CgNpbWcQARgAMgcIABCKBRBDMgcIABCKBRBDMgcIABCKBRBDMgUIABCABDIFCAAQgAQyBQgAEIAEMgcIABCKBRBDMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIIxAnUM0CWM0CYP4QaABwAHgAgAGGAYgB4wGSAQMxLjGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=5smqZLmJOsOhwPAPlciTiAk&bih=969&biw=1920#imgrc=qqk5vk2cAwTcjM";
  }
}
