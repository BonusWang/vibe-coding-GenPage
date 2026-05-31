const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "index.html");
const cssPath = path.join(root, "styles.css");
const scriptPath = path.join(root, "script.js");
const avatarPath = path.join(root, "头像1.png");

assert.equal(fs.existsSync(htmlPath), true, "index.html should exist");
assert.equal(fs.existsSync(cssPath), true, "styles.css should exist");
assert.equal(fs.existsSync(scriptPath), true, "script.js should exist");
assert.equal(fs.existsSync(avatarPath), true, "avatar image should exist");

const html = fs.readFileSync(htmlPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const js = fs.readFileSync(scriptPath, "utf8");

assert.match(html, /<link[^>]+href=["']styles\.css["']/i, "index.html should load styles.css");
assert.match(html, /cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.1\/css\/all\.min\.css/i, "index.html should load Font Awesome icons");
assert.match(html, /<script[^>]+src=["']script\.js["'][^>]*defer/i, "index.html should load script.js with defer");
assert.match(html, /<main\b[^>]*class=["'][^"']*container[^"']*["']/i, "homepage should use a centered container");
assert.match(html, /class=["'][^"']*profile[^"']*["']/i, "homepage should include a profile section");
assert.match(html, /class=["'][^"']*avatar-ring[^"']*["']/i, "avatar should be wrapped in an avatar ring");
assert.match(html, /<img[^>]+class=["'][^"']*avatar[^"']*["'][^>]+src=["']头像1\.png["']/i, "avatar should use the provided image");
assert.match(html, /<h1\b[^>]*>[^<]+<\/h1>/i, "profile name should be an h1");
assert.match(html, /<p\b[^>]*class=["'][^"']*bio[^"']*["'][^>]*>[^<]+<\/p>/i, "bio should be a visible paragraph");
assert.match(html, /class=["'][^"']*eyebrow[^"']*["']/i, "homepage should include a small green intro line");
assert.match(html, /class=["'][^"']*headline[^"']*["']/i, "homepage should include a large portfolio-style headline");
assert.match(html, /class=["'][^"']*link-card[^"']*["']/i, "links should use reference-style link cards");
assert.match(html, /class=["'][^"']*link-icon[^"']*["']/i, "link cards should include left icons");
assert.match(html, /class=["'][^"']*link-arrow[^"']*["']/i, "link cards should include right arrows/actions");
assert.match(html, /class=["'][^"']*toast[^"']*["'][^>]+id=["']toast["']/i, "copy feedback should use a floating toast");
assert.match(html, /class=["'][^"']*footer[^"']*["']/i, "page should include a reference-style footer");

function assertHasClassTokens(tokens, message) {
  const classLists = [...html.matchAll(/class=["']([^"']+)["']/gi)].map((match) =>
    match[1].split(/\s+/)
  );
  assert.equal(
    classLists.some((classList) => tokens.every((token) => classList.includes(token))),
    true,
    message
  );
}

for (const label of ["GitHub", "Twitter", "YouTube", "Bilibili", "Email"]) {
  const pattern = new RegExp(`<a[^>]+class=["'][^"']*link-card[^"']*["'][^>]*>[\\s\\S]*${label}[\\s\\S]*<\\/a>`, "i");
  assert.match(html, pattern, `${label} should be present as a link button`);

  const linkPattern = new RegExp(`<a[^>]+class=["'][^"']*link-card[^"']*["'][^>]+target=["']_blank["'][^>]+rel=["']noopener noreferrer["'][^>]*>[\\s\\S]*${label}[\\s\\S]*<\\/a>`, "i");
  assert.match(html, linkPattern, `${label} should open in a new tab safely`);
}

for (const [label, ...classes] of [
  ["GitHub", "link-icon", "fa-brands", "fa-github"],
  ["Twitter", "link-icon", "fa-brands", "fa-x-twitter"],
  ["YouTube", "link-icon", "fa-brands", "fa-youtube"],
  ["Bilibili", "link-icon", "fa-brands", "fa-bilibili"],
  ["Email", "link-icon", "fa-solid", "fa-envelope"],
  ["WeChat", "link-icon", "fa-brands", "fa-weixin"],
]) {
  assertHasClassTokens(classes, `${label} should use a real Font Awesome icon`);
}

assert.doesNotMatch(
  html,
  /<span[^>]+class=["'][^"']*link-icon[^"']*["'][^>]*>\s*(?:GH|TW|BI|@|WX)\s*<\/span>/i,
  "link icons should not use text abbreviations"
);
assert.match(html, /WeChat/i, "WeChat label should be visible");
assert.match(html, /id=["']copy-wechat["']/i, "WeChat copy button should exist");
assert.match(html, /data-wechat=["']wamgjt1127["']/i, "WeChat copy button should contain the requested ID");
assert.match(html, /id=["']toast["'][^>]*>\s*已复制/i, "copied toast should exist");
assert.match(html, /id=["']theme-toggle["']/i, "theme toggle button should exist");
assert.doesNotMatch(html, /id=["']music-toggle["']/i, "music toggle button should be removed");
assert.match(html, /id=["']visit-count["']/i, "visit count display should exist");
assert.doesNotMatch(html, /class=["'][^"']*prompt[^"']*["']/i, "links should not use terminal prompt markup");
assert.match(css, /display:\s*grid|display:\s*flex/i, "CSS should use grid or flex for centering/layout");
assert.match(css, /@media\s*\(/i, "CSS should include a responsive media query");
assert.match(css, /\.container\b/i, "CSS should style the centered container");
assert.match(css, /\.profile\b/i, "CSS should style the profile section");
assert.match(css, /\.avatar-ring\b/i, "CSS should style the avatar ring");
assert.match(css, /\.link-card\b/i, "CSS should style reference-style link cards");
assert.match(css, /--bg:\s*#000000/i, "CSS should use a black background token");
assert.match(css, /--reference-bg:\s*#07060e/i, "CSS should include the reference neon background");
assert.match(css, /#4ade80/i, "CSS should include the green reference accent");
assert.match(css, /#8a2be2/i, "CSS should include the reference purple accent");
assert.match(css, /#00d2ff/i, "CSS should include the reference cyan accent");
assert.match(css, /#ff0080/i, "CSS should include the reference pink accent");
assert.match(css, /#ccd6f6/i, "CSS should include a pale blue-gray title color");
assert.match(css, /#8892b0/i, "CSS should include muted blue-gray body text");
assert.match(css, /font-family:[^;]*(?:IBM Plex Sans|Inter|system-ui|sans-serif)/i, "CSS should use a modern sans-serif font");
assert.match(css, /\.headline[\s\S]*font-size:\s*clamp\(/i, "Headline should use large responsive display type");
assert.match(css, /\.link-card[\s\S]*border:\s*1px solid var\(--accent\)/i, "Link cards should use green outline styling");
assert.match(css, /\.link-card:hover[\s\S]*(?:box-shadow|border-color|background|transform):/i, "Link card hover should use a restrained green highlight");
assert.match(css, /\.container[\s\S]*max-width:\s*420px/i, "Container should match the reference max width");
assert.match(css, /body[\s\S]*padding:\s*3rem 1rem/i, "Body spacing should match the reference page");
assert.match(css, /\.avatar-ring[\s\S]*width:\s*110px[\s\S]*height:\s*110px/i, "Avatar ring should match the reference size");
assert.match(css, /\.avatar[\s\S]*width:\s*100px[\s\S]*height:\s*100px/i, "Avatar should match the reference size");
assert.match(css, /\.profile[\s\S]*margin-bottom:\s*2\.5rem/i, "Profile spacing should match the reference");
assert.match(css, /\.links[\s\S]*gap:\s*0\.7rem/i, "Link spacing should match the reference");
assert.match(css, /\.link-card[\s\S]*padding:\s*0\.85rem 1\.2rem/i, "Link card padding should match the reference");
assert.match(css, /\.link-card[\s\S]*border-radius:\s*14px/i, "Link card radius should match the reference");
assert.match(css, /\[data-theme=["']reference["']\]/i, "CSS should include a reference style theme");
assert.match(css, /\.toast\b/i, "CSS should style floating toast feedback");
assert.match(css, /\.footer\b/i, "CSS should style the footer");
assert.match(css, /transition:[\s\S]*(?:background|color)/i, "Theme changes should have smooth transitions");
assert.doesNotMatch(css, /\[data-theme=["']light["']\]/i, "CSS should not switch to a white light theme");
assert.match(css, /\.utility-bar\b/i, "CSS should position top-right controls");
assert.doesNotMatch(css, /terminal-blink|@keyframes\s+[\w-]*blink/i, "CSS should not use terminal blink animation");
assert.doesNotMatch(css, /monospace|Consolas|Courier/i, "CSS should not use terminal monospace fonts");
assert.match(js, /navigator\.clipboard|execCommand\(["']copy["']\)/i, "script should copy the WeChat ID");
assert.match(js, /wamgjt1127/i, "script should reference the requested WeChat ID");
assert.match(js, /toast/i, "script should update the toast feedback");
assert.match(js, /localStorage/i, "script should use localStorage");
assert.match(js, /visit-count/i, "script should update the visit count");
assert.match(js, /theme-toggle/i, "script should wire the theme toggle");
assert.match(js, /reference/i, "script should toggle the reference style");
assert.doesNotMatch(js, /music-toggle/i, "script should not wire a music toggle");
assert.doesNotMatch(js, /AudioContext|webkitAudioContext/i, "script should not create background music");

console.log("Homepage structure checks passed.");
