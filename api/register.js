require('babel-polyfill');
require('babel-core/register')({
    presets: ["es2015"],
    //plugins: ["syntax-async-functions", "syntax-async-generators"]
});
require('./src/server');
