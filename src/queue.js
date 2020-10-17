"use strict";

//for new links
const queue = [];
const scope=[];
//for crawled links
const crawled=[];

function queueManager(uri) {
    //if url is undefined
    if (uri == undefined) {
        //return
        return;
    }
    //if queue list is null uri will be base url
    if (queue.length == 0) {
        //get hostname for analyzing scope
        scope[0] = new URL(uri).hostname;
        //add queue
        queue.push(uri);
        //return
        return;
    }
    //if uri is includes in queue
    if (queue.includes(uri)) {
        return;
    }

    //create uri schema
    let schema = new URL(uri);
    //if hostname is not equal to scope
    if (schema.hostname != scope[0]) {
        //return 
        return;
    }
    //add uri to queue
    queue.push(uri);
}

//export all modules
module.exports = {
    queue,
    scope,
    crawled,
    queueManager
}