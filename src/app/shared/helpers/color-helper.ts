import { ColorSource } from "../constants/color-source.constant";
import { Utility } from "../utils/utility";

export class ColorHelper {
  public static getRandomColorCode() {
    const source = ColorSource;
    const random = Utility.randomInRange(0, source.length - 1);
    return source[random];
  }
}
