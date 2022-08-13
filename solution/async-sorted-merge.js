"use strict";
const { getAsyncLogs, sortLogsByDate, resolveAsyncLogs } = require("../lib/utils")

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    
    const logsPromisesEntries = logSources.reduce((acc, logEntry) => {
      const logs = getAsyncLogs(logEntry)
      return [...acc, logs]
    }, []);
    
    const logsEntries = resolveAsyncLogs(logsPromisesEntries);

    logsEntries.then(logs => {
      const sortedLogs = sortLogsByDate(logs);
      sortedLogs.map(log => printer.print(log));
      printer.done();
  
  
      resolve(console.log("Async sort complete."));
    });
  })
    
  
};
