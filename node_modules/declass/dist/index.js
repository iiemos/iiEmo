'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const cheerio2 = require('cheerio');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const cheerio2__default = /*#__PURE__*/_interopDefaultLegacy(cheerio2);

function declass(html) {
  const {items, map} = parseHTML(html);
  const groups = makeGroups(items).filter((item) => item.uses.size > 5 && getClasses(item).length > 2).sort((a, b) => b.uses.size - a.uses.size);
  return groups.map((g) => ({
    class: g.class,
    uses: Array.from(g.uses).map((u) => map[u])
  }));
}
function makeGroups(items) {
  const itemGroups = {};
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const commonClasses = intersect(getClasses(items[i]), getClasses(items[j]));
      if (commonClasses.length > 1) {
        const uClass = commonClasses.join(" ");
        if (!itemGroups[uClass]) {
          itemGroups[uClass] = {class: uClass, uses: new Set()};
        }
        itemGroups[uClass].uses = union(itemGroups[uClass].uses, items[i].uses, items[j].uses);
      }
    }
  }
  return Object.values(itemGroups);
}
function getClasses(item) {
  if (!item._class) {
    item._class = uniq(item.class.split(" ").map((x) => x.trim()).filter(Boolean).sort());
  }
  return item._class;
}
function uniq(arr) {
  return Array.from(new Set(arr));
}
function intersect(a, b) {
  return a.filter((item) => b.includes(item));
}
function union(...args) {
  const r = new Set();
  for (const arg of args) {
    arg.forEach((x) => {
      r.add(x);
    });
  }
  return r;
}
function parseHTML(html) {
  const items = [];
  const map = {};
  const $ = cheerio2__default['default'].load(html);
  $("*").each((id, el) => {
    map[id] = `<${el.tagName} ${Object.entries(el.attribs).map((a) => `${a[0]}="${a[1]}"`).join(" ")}>`;
    const item = {
      uses: new Set(),
      class: el.attribs.class || ""
    };
    item.uses.add(id);
    if (getClasses(item).length > 1) {
      items.push(item);
    }
  });
  return {
    items,
    map
  };
}

exports.declass = declass;
