#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const { program } = require('commander');
const { spawnSync } = require('child_process');

program.version('1.0.0');

program
  .command('create <projectName>')
  .description('Create a new project structure')
  .option('-f, --frontend', 'Include React frontend template')
  .option('-b, --backend', 'Include Node.js backend template')
  .action((projectName, options) => {
    const projectPath = path.join(process.cwd(), projectName);
    fs.mkdirSync(projectPath);

    if (options.frontend) {
      // Create React frontend using create-react-app
      const frontendPath = path.join(projectPath, 'frontend');
      spawnSync('npx', ['create-react-app', 'frontend'], { cwd: projectPath, stdio: 'inherit' });
    }

    if (options.backend) {
      // Copy Node.js backend template files
      const backendTemplatePath = path.join(__dirname, 'templates', 'backend');
      fs.copySync(backendTemplatePath, path.join(projectPath, 'backend'));
    }

    console.log('Project structure created successfully!');
  });

program.parse(process.argv);
