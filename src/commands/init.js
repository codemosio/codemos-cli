const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { copyTemplate } = require('@codemosio/templates') 

async function initCodemos(targetPath) {
  // Ask the user for course details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'courseTitle',
      message: 'Course title:',
      validate: function (input) {
        if (input.trim() === '') {
          return 'Course title cannot be empty!';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'courseDescription',
      message: 'Course description:',
      validate: function (input) {
        if (input.trim() === '') {
          return 'Course description cannot be empty!';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'courseContentLocation',
      message: 'Course content folder (by default ./codemos):',
      default: 'codemos',
      validate: function (input) {
        const valid = /^[a-zA-Z0-9_-]+$/i.test(input); // Check if it's a single folder name
        if (!valid) {
          return 'Please provide a valid folder name without path segments.';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'createSampleContent',
      message: 'Create sample content files for your course:',
      default: true,
    }
  ]);

  // Get the course details from the user
  const { courseTitle, courseDescription, courseContentLocation, createSampleContent } = answers;

  // Resolve the target path and create the .codemos folder
  const resolvedPath = path.resolve(targetPath);

  // TODO: not useful on first init, so remove it? 
  // Create the .codemos folder if it doesn't exist
  // const codemosFolderPath = path.join(resolvedPath, '.codemos');
  // if (!fs.existsSync(codemosFolderPath)) {
  //   fs.mkdirSync(codemosFolderPath, { recursive: true });
  //   console.log(`.codemos folder created at ${codemosFolderPath}`);
  // }

  // Create the srcDir folder based on the course content location
  const srcDirPath = path.join(resolvedPath, courseContentLocation);
  if (!fs.existsSync(srcDirPath)) {
    fs.mkdirSync(srcDirPath, { recursive: true });
    console.log(`Course content folder created at ${srcDirPath}`);
  }

  // Generate the config.js file
  const configFilePath = path.join('./codemos.config.json');
  // TODO: put in a separate file (config-template) or create a type courseConfig to serialize directly (better)  ? 
  const configContent = `{
  "title": "${courseTitle}",
  "description": "${courseDescription}",
  "srcDir": "${courseContentLocation}",
  "links": [] 
}`;

  fs.writeFileSync(configFilePath, configContent);
  console.log(`Course configuration saved in ${configFilePath}`);

  // Optionally create sample content files in the srcDir
  if (createSampleContent) {
    // Create sample files in the srcDir
    // const sampleFilePath = path.join(srcDirPath, 'sample.md');
    copyTemplate('codemos', srcDirPath)
    console.log(`Sample content file created at ${srcDirPath}`);
  }
}

module.exports = initCodemos;
