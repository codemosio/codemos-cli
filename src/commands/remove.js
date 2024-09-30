const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

async function removeCodemos() {
  // Ask the user for course details
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmRemove',
      message: `Do you really want to remove all Codemos content? 
      (your course folder and its content will be deleted)`,
      default: false,
    }
  ]);

  // Get the course details from the user
  const { confirmRemove } = answers;

  if(!confirmRemove) {
    console.info('Aborting...') // aborting function ? error, reason (msg)
    return;
  } 

  console.info('Removing codemos content...')

  // Read the config.js file
  const configFilePath = path.join('./codemos.json');
  if (!fs.existsSync(configFilePath)) {
    console.error(`Course config file not found. Aborting...`); // aborting function ? error, reason (msg)
  }

  let configData;
  try {
    configData = JSON.parse(fs.readFileSync(configFilePath));
  } catch(error) {
    console.error('Fail to parse data from config file. Aborting...'); // aborting function ? error, reason (msg)
  } 

  if (!fs.existsSync(configData.srcDir)) {
    console.info(`Course folder not found at expected location ${configData.srcDir}. Aborting ...`);
    return;
  } 
  
  // remove files (TODO: keep all deletetions here or one try/catch per file ?)
  try {
    fs.rmSync(configData.srcDir, { recursive: true, force: true })
    fs.rmSync(configFilePath)
  } catch(error) {
    console.error('Fail to delete files. Aborting...', error); // aborting function ? error, reason (msg), display error?
  }

}

module.exports = removeCodemos;
