// Validate the public catalogue before publishing the portal.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function loadCatalogue() {
  const source = fs.readFileSync(path.join(root, 'catalogue.js'), 'utf8');
  const document = {querySelectorAll: () => []};
  return vm.runInNewContext(`${source}\n;({CATS,TASKS,DASH})`, {document}, {
    filename: 'catalogue.js', timeout: 1000,
  });
}

function validate({CATS, TASKS, DASH}) {
  const errors = [];
  if (!Array.isArray(CATS) || !Array.isArray(TASKS) || !Array.isArray(DASH)) {
    return ['CATS, TASKS and DASH must be arrays'];
  }
  const categoryIds = new Set();
  const taskIds = new Set();
  for (const [i, category] of CATS.entries()) {
    if (!category || typeof category.id !== 'string' || !category.id.trim() ||
        typeof category.label !== 'string' || !category.label.trim()) {
      errors.push(`Category ${i + 1} needs an id and label`);
      continue;
    }
    if (categoryIds.has(category.id)) errors.push(`Duplicate category: ${category.id}`);
    categoryIds.add(category.id);
  }
  for (const [i, task] of TASKS.entries()) {
    if (!task || typeof task.id !== 'string' || !task.id.trim() ||
        typeof task.label !== 'string' || !task.label.trim()) {
      errors.push(`Task ${i + 1} needs an id and label`);
      continue;
    }
    if (taskIds.has(task.id)) errors.push(`Duplicate task: ${task.id}`);
    taskIds.add(task.id);
  }
  const urls = new Set();
  const titles = new Set();
  for (const [i, entry] of DASH.entries()) {
    const label = `Entry ${i + 1}`;
    if (!entry || typeof entry !== 'object') {
      errors.push(`${label} must be an object`);
      continue;
    }
    if (!categoryIds.has(entry.c)) errors.push(`${label} has unknown category: ${entry.c}`);
    if (!taskIds.has(entry.task)) errors.push(`${label} has unknown task: ${entry.task}`);
    for (const [key, name] of [['t', 'title'], ['d', 'description']]) {
      if (typeof entry[key] !== 'string' || !entry[key].trim()) {
        errors.push(`${label} needs a ${name}`);
      }
    }
    if (!Array.isArray(entry.tags) || !entry.tags.length ||
        entry.tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
      errors.push(`${label} needs non-empty tags`);
    }
    if (typeof entry.t === 'string') {
      if (titles.has(entry.t)) errors.push(`${label} repeats title: ${entry.t}`);
      titles.add(entry.t);
    }
    if (typeof entry.u !== 'string' ||
        !/^https:\/\/phuazz\.github\.io\/[A-Za-z0-9-]+\/$/.test(entry.u)) {
      errors.push(`${label} needs a public phuazz.github.io Pages URL`);
    } else {
      if (urls.has(entry.u.toLowerCase())) errors.push(`${label} repeats URL: ${entry.u}`);
      urls.add(entry.u.toLowerCase());
    }
  }
  return errors;
}

function checkPages() {
  const errors = [];
  for (const page of ['index.html', 'dashboards.html']) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    if (!html.includes('<script src="catalogue.js"></script>')) {
      errors.push(`${page} does not load catalogue.js`);
    }
  }
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if ((home.match(/data-dashboard-count/g) || []).length !== 2) {
    errors.push('Homepage needs two catalogue-backed dashboard totals');
  }
  if ((home.match(/data-theme-count/g) || []).length !== 1) {
    errors.push('Homepage needs one catalogue-backed theme total');
  }
  return errors;
}

function selftest(data) {
  const clone = () => JSON.parse(JSON.stringify(data));
  const cases = [
    x => { x.DASH[0].task = 'unknown'; },
    x => { x.DASH[0].c = 'unknown'; },
    x => { x.DASH[1].u = x.DASH[0].u; },
    x => { x.DASH[0].u = 'https://github.com/private/repo/'; },
    x => { x.DASH[0].t = ''; },
  ];
  if (validate(data).length) throw new Error('Current catalogue failed before self-test');
  for (const [i, mutate] of cases.entries()) {
    const bad = clone();
    mutate(bad);
    if (!validate(bad).length) throw new Error(`Self-test ${i + 1} did not fail`);
  }
  console.log(`${cases.length} catalogue failure cases passed`);
}

try {
  const data = loadCatalogue();
  if (process.argv.includes('--selftest')) selftest(data);
  const errors = [...validate(data), ...checkPages()];
  if (errors.length) {
    for (const error of errors) console.error(`FAIL: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Catalogue OK: ${data.DASH.length} entries, ${data.CATS.length} themes, ${data.TASKS.length} tasks`);
  }
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
}
