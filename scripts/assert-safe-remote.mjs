import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const policy = JSON.parse(readFileSync(new URL('../.remote-policy.json', import.meta.url), 'utf8'));
const fullName = `${policy.owner}/${policy.repository}`;
const allowedUrls = new Set([
  `https://github.com/${fullName}.git`,
  `git@github.com:${fullName}.git`,
]);

function run(command, args) {
  return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function fail(message) {
  console.error(`远程安全检查失败：${message}`);
  process.exit(1);
}

function parseGitHubUrl(url) {
  const match = url.match(/^(?:https:\/\/github\.com\/|git@github\.com:)([^/]+)\/([^/]+?)(?:\.git)?$/i);
  return match ? { owner: match[1], repository: match[2] } : null;
}

const remotes = run('git', ['remote']).split(/\r?\n/).filter(Boolean);
if (remotes.length !== 1 || remotes[0] !== 'origin') fail(`remote 必须且只能是 origin，当前为 ${remotes.join(', ') || '<空>'}`);

const fetchUrl = run('git', ['remote', 'get-url', 'origin']);
const pushUrl = run('git', ['remote', 'get-url', '--push', 'origin']);
if (!allowedUrls.has(fetchUrl)) fail(`origin fetch URL 不在白名单：${fetchUrl}`);
if (!allowedUrls.has(pushUrl)) fail(`origin push URL 不在白名单：${pushUrl}`);

const parsed = parseGitHubUrl(pushUrl);
if (!parsed) fail('无法解析 origin push URL');
if (parsed.owner !== policy.owner || parsed.repository !== policy.repository) fail(`当前仓库 ${parsed.owner}/${parsed.repository} 与白名单 ${fullName} 不一致`);
if (policy.blockedOwners.some((owner) => pushUrl.toLowerCase().includes(owner.toLowerCase())) || pushUrl.toLowerCase().includes('upstream')) fail('URL 包含永久禁止的 owner 或 upstream 标识');

let account;
if (process.env.GITHUB_ACTIONS === 'true') {
  if (process.env.GITHUB_REPOSITORY !== fullName || process.env.GITHUB_REPOSITORY_OWNER !== policy.owner) fail('GitHub Actions 仓库上下文与白名单不一致');
  account = `${process.env.GITHUB_ACTOR ?? 'github-actions'} (workflow identity)`;
} else {
  run('gh', ['auth', 'status']);
  account = run('gh', ['api', 'user', '--jq', '.login']);
  if (account !== policy.owner) fail(`当前 gh 登录账号为 ${account}，要求为 ${policy.owner}`);
}

const api = JSON.parse(run('gh', ['api', `repos/${fullName}`]));
if (api.owner?.login !== policy.owner) fail(`GitHub API owner 为 ${api.owner?.login ?? '<空>'}`);
if (api.fork !== false) fail('GitHub API 显示 fork=true');
if (api.parent != null || api.source != null) fail('GitHub API 显示 parent/source 非空');

console.log(JSON.stringify({
  phase: policy.phase,
  account,
  repositoryOwner: parsed.owner,
  remoteCount: remotes.length,
  fetchUrl,
  pushUrl,
  fork: api.fork,
  parent: api.parent ?? null,
  source: api.source ?? null,
  allowedRepository: fullName,
}, null, 2));
console.log('远程安全检查通过。');
