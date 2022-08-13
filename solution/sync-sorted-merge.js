"use strict";
const _ = require("lodash");
const { getSyncLogs, sortLogsByDate } = require("../lib/utils")

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const logsEntries = logSources.reduce((acc, logEntry) => {
    const logs = getSyncLogs(logEntry)
    return [...acc, ...logs]
  }, []);

  const sortedLogs = sortLogsByDate(logsEntries);
  sortedLogs.map(log => printer.print(log));
  printer.done();

  return console.log("Sync sort complete.");
};
