const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('repository cards render hostile API data as text in a real browser', () => {
  const page = process.env.REPOSITORIES_PAGE
    ? fs.readFileSync(process.env.REPOSITORIES_PAGE, 'utf8') : read('_pages/repositories.md');
  const source = [...page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .find(match => match[1].includes('function createRepoCard'))[1];
  const html = `<!doctype html><div id="repo-list"></div>
    <script>
      const attack = '<img src=x onerror="window.__injected=true">';
      window.fetch = async () => ({json: async () => ({message: attack})});
    </script>
    <script>${source}</script>
    <script>
      setTimeout(() => {
        try {
          const check = (value, message) => { if (!value) throw new Error(message); };
          const list = document.getElementById('repo-list');
          check(list.textContent === 'Error: ' + attack, 'API error must remain text');
          list.replaceChildren();
          createRepoCard({
            name: attack, description: attack, html_url: 'javascript:alert(1)',
            fork: true, parent: {html_url: 'https://github.com.evil.example/repo',
              full_name: attack, stargazers_count: attack, forks_count: 4}
          });
          check(!list.querySelector('img, script, iframe'), 'API data created markup');
          check(!list.querySelector('a[href]'), 'unsafe URL remained clickable');
          check(list.querySelector('.card-text').textContent === attack, 'description changed');
          check(!window.__injected, 'injected event handler executed');
          for (const url of ['data:text/html,test', '//evil.example', 'https://user@github.com/x', 'not a URL']) {
            check(!repoLink(url, attack).hasAttribute('href'), 'unsafe URL accepted: ' + url);
          }
          list.replaceChildren();
          createRepoCard({name: 'example', description: null, html_url: 'https://github.com/UQMM-Lab/example',
            fork: true, parent: {html_url: 'https://github.com/owner/example',
              full_name: 'owner/example', stargazers_count: 12, forks_count: 3}});
          check(list.querySelector('.card-text').textContent === 'no description', 'fallback missing');
          check(list.querySelector('.badge-primary').textContent === 'Stars: 12', 'parent stats missing');
          check(list.querySelectorAll('a[href]').length === 2, 'valid GitHub links missing');
          check(list.querySelector('a').rel === 'noopener noreferrer', 'opener protection missing');
          showRepoMessage(attack);
          check(list.textContent === attack && !list.querySelector('img'), 'error message injected markup');
          document.body.dataset.result = 'passed';
        } catch (error) {
          document.body.dataset.result = 'failed';
          document.body.textContent = error.message;
        }
      }, 0);
    </script>`;
  const browser = process.env.CHROME_BIN || 'chromium';
  const result = spawnSync(browser, ['--headless', '--no-sandbox', '--disable-gpu',
    '--virtual-time-budget=1000', '--dump-dom', 'data:text/html,' + encodeURIComponent(html)],
    { encoding: 'utf8', timeout: 60000, maxBuffer: 2 * 1024 * 1024 });
  assert.equal(result.status, 0, result.error?.message || result.stderr);
  assert.match(result.stdout, /<body data-result="passed">/, result.stdout);
});

test('workflow treats hostile branch names as a single literal argument', () => {
  const workflow = read('.github/workflows/deploy.yml');
  const step = workflow.split('    - name: Deploy website\n')[1];
  assert.ok(step, 'deployment step missing');
  const run = step.split('      run: |\n')[1].replace(/^        /gm, '');
  assert.ok(!run.includes('${{'), 'GitHub expressions must not interpolate shell source');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'site-deploy-test-'));
  try {
    fs.mkdirSync(path.join(temp, 'bin'));
    fs.writeFileSync(path.join(temp, 'bin/deploy'), 'printf "%s\\0" "$@" > arguments\nread -r answer\n[[ "$answer" == y ]]\n');
    const branch = 'release/$(touch${IFS}INJECTED)';
    for (const noPush of ['', '--no-push', '$(touch INJECTED)']) {
      const result = spawnSync('bash', ['-e', '-o', 'pipefail', '-c', run], {
        cwd: temp, encoding: 'utf8',
        env: {...process.env, SRC_BRANCH: branch, DEPLOY_BRANCH: 'gh-pages', NO_PUSH: noPush}
      });
      assert.equal(result.status, 0, result.stderr);
      const args = fs.readFileSync(path.join(temp, 'arguments'), 'utf8').split('\0').slice(0, -1);
      assert.deepEqual(args, ['--src', branch, '--deploy', 'gh-pages', ...(noPush === '--no-push' ? ['--no-push'] : [])]);
      assert.ok(!fs.existsSync(path.join(temp, 'INJECTED')));
    }
  } finally {
    fs.rmSync(temp, {recursive: true, force: true});
  }
});

test('deploy rejects missing, invalid and identical branches before changing files', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'site-ref-test-'));
  try {
    fs.writeFileSync(path.join(temp, 'keep'), 'unchanged');
    for (const args of [['--src'], ['--deploy'], ['--src', '-f'],
      ['--src', 'bad branch'], ['--src', 'gh-pages', '--deploy', 'gh-pages']]) {
      const result = spawnSync('bash', [path.join(root, 'bin/deploy'), ...args],
        {cwd: temp, input: 'y\n', encoding: 'utf8', timeout: 5000});
      assert.notEqual(result.status, 0, JSON.stringify(args));
      assert.equal(fs.readFileSync(path.join(temp, 'keep'), 'utf8'), 'unchanged');
    }
  } finally {
    fs.rmSync(temp, {recursive: true, force: true});
  }
});
