#!/usr/bin/env node

var argv = require('optimist').argv,
    path = require('path'),
    fs = require('fs'),
    configFile = {},
    configPath;

if (argv.h || argv.help) {
    console.log([
    'usage: chateau [options]',
    '',
    'options:',
    '  -f [config_file]   Default file: config.js',
    '  -p [server_port]   Default port: 3000',
    '  -h                 Shows this help',
    ].join('\n'));
    process.exit();
}

configPath = path.resolve(argv.f || 'config.js');

if(!fs.existsSync(configPath))
{
    console.warn('Warning:','Configuration file does not exists. Using default one instead.');
    configPath = path.resolve(__dirname, '../', 'config.template.js');
}

configFile = require(configPath);

if(argv.p)
{
    configFile.expressPort = argv.p;
}

require('./app.js')(configFile);
