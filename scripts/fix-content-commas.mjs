import fs from "fs";

const p = "src/data/wheelUniqueContent.ts";
let s = fs.readFileSync(p, "utf8");
const fixed = s.replace(/\}\r?\n\r?\n  "/g, '},\n\n  "');
fs.writeFileSync(p, fixed);
console.log("comma fix applied", s !== fixed);
