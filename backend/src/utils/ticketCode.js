import { randomInt } from "crypto";

function generateSegment() {
  return randomInt(0, 0x10000).toString(16).padStart(4, "0").toUpperCase();
}

export function generateCode(segmentCount = 3) {
  let code = "";

  for (let i = 0; i < segmentCount; i++) {
    code += generateSegment();

    if (i < segmentCount - 1) {
      code += "-";
    }
  }

  return code;
}
