require('dotenv').config();
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(), // Menambahkan timestamp ke setiap log
        winston.format.json() // Format log menjadi JSON
    
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'app/logging/error.log', level: 'error' }),
      // new winston.transports.Console({
      //   level: 'debug',
      // })
    ],
});

// if (process.env.APP_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//       format: winston.format.simple(),
//     }));
// }
if (process.env.APP_ENV === "production") {
    logger.add(new winston.transports.File({ filename: 'app/logging/combined.log' }));
}

module.exports = logger;