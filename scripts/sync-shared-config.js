#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const { program } = require('commander');

program
  .name('sync-shared-config')
  .description('同步 AntV 共享的 GitHub 配置')
  .option('-i, --issue-templates', '仅同步 Issue 模板')
  .option('-w, --workflows', '仅同步 GitHub Actions 工作流')
  .parse();

const options = program.opts();

async function syncConfig() {
  try {
    const sourceRepo = 'antvis/github-config';
    const tempRepo = 'github-config-temp';
    const destGithubDir = path.join(process.cwd(), '.github');

    await fs.mkdir(destGithubDir, { recursive: true });

    console.log('📦 下载 GitHub 配置...');
    execSync(`git clone --depth 1 https://github.com/${sourceRepo}.git ${tempRepo}`);

    console.log('📝 合并 GitHub 配置...');

    if (!options.issueTemplates && !options.workflows) {
      // 同步所有内容
      await fs.cp(path.join(tempRepo, '.github'), destGithubDir, {
        recursive: true,
        force: true,
      });
    } else {
      // 选择性同步
      if (options.issueTemplates) {
        const templateDir = path.join(tempRepo, '.github/ISSUE_TEMPLATE');
        const destTemplateDir = path.join(destGithubDir, 'ISSUE_TEMPLATE');
        await fs.cp(templateDir, destTemplateDir, {
          recursive: true,
          force: true,
        });
      }

      if (options.workflows) {
        const workflowDir = path.join(tempRepo, '.github/workflows');
        const destWorkflowDir = path.join(destGithubDir, 'workflows');
        await fs.cp(workflowDir, destWorkflowDir, {
          recursive: true,
          force: true,
        });
      }
    }

    // 清理临时目录
    await fs.rm(tempRepo, { recursive: true, force: true });

    // 需要移除的子路径列表
    const excludePaths = ['workflows/scripts'];
    for (const excludePath of excludePaths) {
      const _excludePath = path.join(destGithubDir, excludePath);
      try {
        await fs.access(_excludePath);
        await fs.rm(_excludePath, { recursive: true, force: true });
      } catch (err) {
        // 路径不存在时忽略错误
      }
    }

    console.log('✨ AntV GitHub 配置初始化成功!');
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

syncConfig().catch(console.error);
