import { v4 } from "uuid";

export class IdGerator {
  gerate = (): string => {
    return v4();
  };
}