"use strict";

const puppeteer = require('puppeteer');
const chalk = require('chalk');
const colors = {
    LOG: text => text,
    ERR: chalk.red,
    WAR: chalk.yellow,
    INF: chalk.cyan
}
const queue = [];
const crawled=[];
var scope = null;

function queueManager(uri) {
    if (uri == undefined)
    {
        return;
    }
    //if request list is null
    if (queue.length == 0)
    {
        scope = new URL(uri).hostname;
        queue.push(uri);

        return;
    }
    if (queue.includes(uri))
    {
        return;
    }

    let schema = new URL(uri);

    if (schema.hostname !== scope)
    {
        return;       
    }

    queue.push(uri);
}

module.exports=async function analyze(uri) {
    if(!crawled.includes(uri))
    {
        crawled.push(uri);

        try { //open a instance
            const browser = await puppeteer.launch({
                headless: true,
                devtools: true
            });
    
            //open a page
            const page = await browser.newPage();
            
            //This scriptes provides to listen console. If any errors occured and appear on console it catch up them.
            
            page.on('console', message => {
                //get msg type     
                let type = message.type().substr(0, 3).toUpperCase()
                //set color
                let color = colors[type] || chalk.blue
                //write message
                console.log(color(`${type} ${message.text()}`))
            })
            
            page.on('pageerror', message=>
            {
                console.log(message.name);
                console.log(message.stack);
            });
            
     
            page.on('requestfailed', request => 
            {
                console.log(request.url)
                request.method
                request.resourceType
                console.log(chalk.magenta(`${request.failure().errorText} ${request.url()}`))
            });
          

            console.log("---------------------------------------");
    
            console.log("Url:" + uri)
            ///go to target
            await page.goto(uri);

            let links = await page.evaluate(() => {
                var result = [];
                var links = document.links;
                for (var i = 0; i < links.length; i++) {
                    result.push(links[i].href);
                }
                return result;
            });
    
            //add new links to queue
            for (var i = 0; i < links.length; i++) {
                queueManager(links[i]);
            }
    
            //analyze queue
            for (var i = 0; i < queue.length; i++) {
                await analyze(queue[i]);
            }
            console.log(queue.length);
            
            //close page
            await page.close();
            
            //close instance
            await browser.close();
            //return result
    
            //if any error  
        } catch (e) {
            console.log(e);
        }       
    }
}