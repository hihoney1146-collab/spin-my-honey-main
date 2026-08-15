import fs from "fs";

const path = "src/data/wheelUniqueContent.ts";
let s = fs.readFileSync(path, "utf8");
const before = (s.match(/pick-out-of-a-hat-generator/g) || []).length;
s = s.replace(
  /\s*\{ slug: "pick-out-of-a-hat-generator", anchor: "[^"]+" \},?/g,
  ""
);
fs.writeFileSync(path, s);
const after = (fs.readFileSync(path, "utf8").match(/pick-out-of-a-hat-generator/g) || []).length;
console.log(`hat refs ${before} -> ${after}`);
