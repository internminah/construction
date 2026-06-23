const colors = {
  reset: '\x1b[0m',
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[90m'
};

const getTimestamp = () => new Date().toISOString();

const logger = {
  info: (message) => {
    console.log(`${colors.info}[INFO] ${getTimestamp()}: ${message}${colors.reset}`);
  },
  warn: (message) => {
    console.warn(`${colors.warn}[WARN] ${getTimestamp()}: ${message}${colors.reset}`);
  },
  error: (message, error) => {
    const errorDetails = error ? ` - ${error.stack || error.message || error}` : '';
    console.error(`${colors.error}[ERROR] ${getTimestamp()}: ${message}${errorDetails}${colors.reset}`);
  },
  debug: (message) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`${colors.debug}[DEBUG] ${getTimestamp()}: ${message}${colors.reset}`);
    }
  }
};

module.exports = { logger };
