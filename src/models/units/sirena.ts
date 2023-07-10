import { Paralyzer } from "../paralyzer";

export class Sirena extends Paralyzer {
  constructor() {
    super();
    this.name = "Sirena";
    this.health = 80;
    this.initiative = 20;
    this.image =
      "https://www.google.com/search?q=naga+dota2&tbm=isch&ved=2ahUKEwimrLW88IGAAxUhEBAIHcNUA_sQ2-cCegQIABAA&oq=naga+dota2&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BggAEAcQHjoICAAQBRAHEB46BggAEAgQHjoECAAQHjoHCAAQGBCABFDbB1jMImD0I2gAcAB4AIABdogBwweSAQM4LjKYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=68mqZOaKHaGgwPAPw6mN2A8&bih=969&biw=1920#imgrc=P4WC5aJypUW7VM";
  }
}
