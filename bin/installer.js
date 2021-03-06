#! /usr/bin/env node

'use strict';

const path = require('path');
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

async function runCmd(command) {
    try {
        const {stdout, stderr} = await exec(command);
        console.log(stdout);
        console.log(stderr);
    } catch {
        (error) => {
            console.log('\x1b[31m', error, '\x1b[0m');
        };
    }
}

if (process.argv.length < 3) {
    console.log('\x1b[31m', 'You have to provide name to your app.');
    console.log('For example:');
    console.log('    npx create-knight-react-app my-app', '\x1b[0m');
    process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/msamgan/react-framework.git';

try {
    fs.mkdirSync(appPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(
            '\x1b[31m',
            `The file ${appName} already exist in the current directory, please give it another name.`,
            '\x1b[0m'
        );
    } else {
        console.log(err);
    }
    process.exit(1);
}

async function setup() {
    try {
        console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m');
        await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

        process.chdir(appPath);

        console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
        await runCmd('yarn');
        console.log();

        await runCmd('npx rimraf ./.git');

        fs.rmdirSync(path.join(appPath, 'bin'), {recursive: true});

        console.log(
            '\x1b[32m',
            'The installation is done, this is ready to use !',
            '\x1b[0m'
        );

        console.log();

        console.log('\x1b[34m', 'You can start by typing:');
        console.log(`    cd ${folderName}`);
        console.log('    yarn start', '\x1b[0m');
        console.log();
        console.log('Check Readme.md for more information');
        console.log();
    } catch (error) {
        console.log(error);
    }
}

setup();
