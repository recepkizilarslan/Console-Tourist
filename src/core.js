"use strict";

const puppeteer = require('puppeteer');
const logger=require('./logger');
const {crawled,queue,queueManager,scope}=require('./queue');


module.exports=async function analyze(uri,cookies=null) {
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

            if(cookies !=null)
            {
                await page.setCookie(cookies);
            }

       
            //This scriptes provides to listen console. If any errors occured and appear on console it catch up them.
            
            page.on('console', message => {
                //get msg type     
                let type = message.type().substr(0, 3).toUpperCase()     
                //write message
                logger(uri,type,message.text());
            })
            
            page.on('pageerror', message=>
            {
                   //get msg type                       //write message
                   logger(uri,'ERR',message.text());
            });    
     
            page.on('requestfailed', request => 
            {
                   let msg=`${request.failure().errorText} ${request.url()}`;   
                   //write message
                   logger(uri,'ERR',msg);
            });
          

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
                await analyze(queue[i],cookies);
            }
            
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