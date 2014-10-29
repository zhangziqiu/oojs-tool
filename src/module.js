#! /usr/bin/env node
require('node-oojs');
require('node-oojs-utility');

oojs.setPath({
    'oojs.command':__dirname,
    'oojs.args':__dirname,
    'oojs.cli':__dirname
});

oojs.using('oojs.cli');