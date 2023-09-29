const fs = require('fs-extra');
const execa = require('execa');

async function createApp(appName) {
  // Define the paths for the server template
  const serverTemplatePath = './templates/server';

  // Create the app directory
  await fs.mkdir(appName);

  // Copy the server template to the app directory
  await fs.copy(serverTemplatePath, `${appName}/server`);

  // Install server dependencies
  const serverPath = `${appName}/server`;
  await execa('npm', ['install'], { cwd: serverPath });

  // Create the client folder and install CRA
  const clientPath = `${appName}/client`;
  await fs.mkdir(clientPath);
  await execa('npx', ['create-react-app', 'client'], { cwd: appName });
}

// Usage: node generate.js my-express-react-app
const appName = process.argv[2];

if (!appName) {
  console.error('Please provide an app name.');
} else {
  createApp(appName).then(() => {
    console.log('App created successfully!');
  });
}
