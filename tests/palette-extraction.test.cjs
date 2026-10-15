// Tests the actual kdSamplePalette/kdAccentPalette source extracted from public/app.js.
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const source = fs.readFileSync(require("node:path").join(__dirname, "../public/app.js"), "utf8");
const start = source.indexOf("const kdAccentCache = new Map();");
const end = source.indexOf("async function kdApplyProductAccents", start);
assert(start >= 0 && end > start, "palette implementation must exist in public/app.js");
const implementation = source.slice(start, end);

let activePixels = null;
const fixtures = new Map();
function rgb(r,g,b,a=255){ return [r,g,b,a]; }
function fixture(parts) {
  const pixels = [];
  for (const [count, color] of parts) for(let i=0;i<count;i++) pixels.push(...color);
  while(pixels.length < 80*80*4) pixels.push(...rgb(0,0,0,0));
  return new Uint8ClampedArray(pixels.slice(0,80*80*4));
}
const colorful = [rgb(30,145,65),rgb(35,75,190),rgb(195,45,55),rgb(215,170,55)];
fixtures.set("white", fixture([[5200,rgb(250,250,250)],[500,rgb(30,145,65)],[350,rgb(35,75,190)],[350,rgb(195,45,55)]]));
fixtures.set("black", fixture([[5200,rgb(5,5,5)],[500,rgb(30,145,65)],[350,rgb(35,75,190)],[350,rgb(195,45,55)]]));
fixtures.set("gray", fixture([[5200,rgb(125,125,125)],[500,rgb(30,145,65)],[350,rgb(35,75,190)],[350,rgb(195,45,55)]]));
fixtures.set("dark", fixture([[4000,rgb(12,16,28)],[700,rgb(20,65,135)],[500,rgb(145,35,45)],[300,rgb(25,110,65)]]));
fixtures.set("muted", fixture([[5000,rgb(135,105,92)],[400,rgb(145,115,105)],[400,rgb(105,125,135)]]));
fixtures.set("gray-image", fixture([[3500,rgb(25,25,25)],[2500,rgb(135,135,135)],[1500,rgb(230,230,230)]]));
fixtures.set("transparent", fixture([[4000,rgb(0,0,0,0)],[800,rgb(20,145,70,255)],[500,rgb(30,80,190,255)],[500,rgb(200,45,50,255)]]));
const context = {
  Map, Promise, Math, URL,
  location:{origin:"https://kardivo.store"},
  document:{createElement(){return {width:0,height:0,getContext(){return {
    drawImage(img){activePixels=fixtures.get(img.fixtureKey);},
    getImageData(){if(activePixels==="canvas-fail") throw Error("tainted canvas");if(!activePixels) throw Error("read failed");return {data:activePixels};}
  }}}}},
  Image: class { set src(value) {
    const key = decodeURIComponent((value.match(/[?&]url=([^&]+)/)||[])[1]||value).split("/").pop();
    this.fixtureKey = key;
    if (key==="canvas-fail") { activePixels="canvas-fail"; queueMicrotask(()=>this.onload&&this.onload()); return; }
    if (key==="fail") { queueMicrotask(()=>this.onerror&&this.onerror()); return; }
    if (!fixtures.has(key)) { queueMicrotask(()=>this.onerror&&this.onerror()); return; }
    queueMicrotask(()=>this.onload&&this.onload());
  }}
};
vm.createContext(context);
vm.runInContext(implementation, context);
(async()=>{
  const cases = [
    ["white", true],["black", true],["gray", true],["dark", true],
    ["muted", true],["gray-image", false],["transparent", true]
  ];
  for(const [name, expectColor] of cases){
    const p=await context.kdSamplePalette("https://images.example/"+name);
    assert(p, `${name}: palette should be extracted`);
    const hues=[p.primary,p.secondary,p.tertiary].map(h=>h.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)));
    const chromatic=hues.some(c=>Math.max(...c)-Math.min(...c)>=16);
    assert.equal(chromatic, expectColor, `${name}: chromatic classification incorrect: ${JSON.stringify(p)}`);
    if(expectColor) assert(hues.filter(c=>Math.max(...c)-Math.min(...c)>=16).length>=1, `${name}: expected chromatic color`);
    console.log(`PASS ${name}: ${JSON.stringify(p)}`);
  }
  const failed=await context.kdSamplePalette("https://images.example/fail");
  assert.equal(failed,null,"sampling failure must be null, not monochrome");
  assert.equal(vm.runInContext('kdAccentCache.has("https://images.example/fail")', context),false,"failed samples must not stay cached");
  console.log("PASS image-load failure: returns null and does not poison cache");
  const canvasFailed=await context.kdSamplePalette("https://images.example/canvas-fail");
  assert.equal(canvasFailed,null,"canvas read failure must not be misclassified as monochrome");
  assert.equal(vm.runInContext('kdAccentCache.has("https://images.example/canvas-fail")', context),false,"canvas failures must not stay cached");
  console.log("PASS canvas-sampling failure: returns null and does not poison cache");
})().catch(e=>{console.error(e);process.exitCode=1;});
