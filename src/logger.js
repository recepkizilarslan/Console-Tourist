"use strict";

const winston = require('winston');

const customFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.level}: ${info.message}`)
  );

const loggers = {
  file: winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: './logs/console.log'})],
  }),

 console: winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: customFormat
        })
    ]
  })
};

module.exports=async function logger(uri, type, message)
{
    let log=`${uri} : ${message}`;
    switch(type)
    {
        case "LOG": 
         loggers.file.info(log);
         loggers.console.info(log);
        break;

        case "INF": 
        loggers.file.info(log);
        loggers.console.info(log);
       break;


        case "ERR" :
         loggers.file.error(log);
         loggers.console.error(log);
        break;

        case "WAR" :
            loggers.file.warn(log);
            loggers.console.warn(log);
           break;
    }
    return;
}

