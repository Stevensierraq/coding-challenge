"use strict";

const _ = require("lodash");

function getSyncLogs(logEntry, logs = [], completed = false) {
    if(completed) return logs;
  
    const log = logEntry.pop();
    const mergeLogs = log ? [...logs, log] : logs;
    return getSyncLogs(logEntry, mergeLogs, !log);
};

async function getAsyncLogs(logEntry, logs = [], completed = false) {
    if(completed) return logs;
  
    const log = await logEntry.popAsync();
    const mergeLogs = log ? [...logs, log] : logs;
    return await getAsyncLogs(logEntry, mergeLogs, !log);
};

async function resolveAsyncLogs(logs){
    let logsEntries = [];
  
    for await (let log of logs) {
        logsEntries = [...logsEntries, ...log]
    }
  
    return logsEntries
};
  
function sortLogsByDate (logs) {
    const sortedLogs = _.sortBy(logs, ['date'], ['asc']);
    return sortedLogs;
};

module.exports = {
    getSyncLogs,
    getAsyncLogs,
    sortLogsByDate,
    resolveAsyncLogs
};
