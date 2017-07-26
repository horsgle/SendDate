var request = require('request');
var schedule = require('node-schedule');
var exec = require('child_process').exec;
var argv = require('minimist')(process.argv.slice(2));
var env = process.env;

console.log('Inicializando o sistema...');
console.log(`Servidor setado para ${argv.s}`);
console.log(`Tempo de requisição está em ${argv.t} minutos`)

var rule = new schedule.RecurrenceRule();
rule.second = argv.t;
schedule.scheduleJob(rule, function(){
    console.log('Data de envio: '+new Date().toLocaleString());
    var opt = {
      url: `${argv.s}`,
      form: {
          date: new Date().toLocaleString(),
          user: env.USER,
          lang: env.LANG,
          home: env.HOME,
          session: env.SESSION,
          pwd: env.PWD
      }
    };
    request.post(opt, function(err,httpResponse,body){
      console.log(body);
    });
});
