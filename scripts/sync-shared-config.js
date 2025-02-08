#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function syncSharedConfig() {
  try {
    const sourceRepo = 'antvis/github-config';
    const tempRepo = 'github-config-temp';
    const destGithubDir = path.join(process.cwd(), '.github');

    await fs.mkdir(destGithubDir, { recursive: true });

    console.log('📦 Downloading GitHub config...');
    execSync(`git clone --depth 1 https://github.com/${sourceRepo}.git ${tempRepo}`);

    // 复制 .github 目录内容，有冲突则覆盖
    console.log('📝 Merging GitHub config...');
    await fs.cp(path.join(tempRepo, '.github'), destGithubDir, {
      recursive: true,
      force: true,
    });

    await fs.rm(tempRepo, { recursive: true, force: true });

    // 需要移除的子路径列表
    const excludePaths = ['workflows/scripts'];
    for (const excludePath of excludePaths) {
      const _excludePath = path.join(destGithubDir, excludePath);
      if (fs.access(_excludePath)) {
        fs.rm(_excludePath, { recursive: true, force: true });
      }
    }

    console.log('✨ AntV GitHub config initialized successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncSharedConfig();
