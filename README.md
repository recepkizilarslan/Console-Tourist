# Tourist
Tourist is a simple tool that allows you to collect console messages, errors, unsuccessful requests of all your pages after the DOM loading with authentication support.

### What does Tourist do?

- Navigates all pages on your website.
- It get all error messages on the console. 
- Then it save the messages.
- It support authentication.

#### Update package

`$ npm install`

### How to you use?

##### Without Authentication.
index.js
```javascript
const tourist=require('./src/core')
(async()=>{
    tourist("https://stackoverflow.com/");
})();
```
`$ node index`



##### With Authentication.
authentication.js


```javascript
/* Set setup your login steps */

 //------ START Login steps ------
await page.type('#email', 'username')
await page.type('#password', 'admin123456')
await page.click('#submit-button')
await page.waitForNavigation();
//------ END Login steps ------

```
index.js
```javascript
const tourist=require('./src/core')
const auth=require('./src/authentication');

(async()=>{
//add yout login url
   var cookies=auth('https://stackoverflow.com/users/login');
   //run tourist with cookies
	tourist("https://stackoverflow.com/",cookies);
})();
```


`$ node index`

### Results

result.log (ex)
```json
{"message":"https://stackoverflow.com : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/# : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/ : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/questions : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/questions : Failed to load resource: the server responded with a status of 400 ()","level":"error"}
{"message":"https://stackoverflow.com/questions : net::ERR_ABORTED https://64083bcc74a934364e3443abb8bd5083.safeframe.googlesyndication.com/safeframe/1-0-37/html/container.html","level":"error"}
{"message":"https://stackoverflow.com/questions : net::ERR_ABORTED https://tpc.googlesyndication.com/safeframe/1-0-37/html/container.html","level":"error"}
{"message":"https://stackoverflow.com/questions : net::ERR_ABORTED https://securepubads.g.doubleclick.net/pcs/view?xai=AKAOjsuC4f2dOLRu7P7T0UrhTrEH2ybUS1nuItt92VgvDaCAb_VdNlCYZUYHMM_zJ2epOaIWjP63jcIFhHRLFPkjXhzMqC1tGLqyO4PM0wiv1z1PaRAQFSzWG_snmORe_UUP5xGF0_zsle4EEZihb-q7AE24dJIcb0mPKdpW7koZ6gV_VypqoIICPNxXvTUZwCgfiHXWT7-2biM_M4aLb2oUZ-wJcoMC1KT_E0ef6EOObGbzi1bUn4HdRvZ2FQIS8Xu3JZuCUfIlzn7IIjpPJf2RU-oeV2zaDq-qn3groYwyGrsa1A&sai=AMfl-YQaUHj6r1WnEUp4se2ZlHx0K1YiFnBKi1fiOv1kiKMeNqs8Nzx4QjcAKUZxZ0Oqj_y5x3y2H_CE5ZROE06av4V3MSvLRCvnOD0wA0NgSyJGjzB58BhSpEPt2nBm9Os&sig=Cg0ArKJSzLLWUMXwS3A6EAE&urlfix=1&adurl=","level":"error"}
{"message":"https://stackoverflow.com/tags : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/users : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/jobs?so_medium=StackOverflow&so_source=SiteNav : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/jobs/companies?so_medium=StackOverflow&so_source=SiteNav : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/teams : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/company : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/jobs?so_source=ProductsMenu&so_medium=StackOverflow : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}
{"message":"https://stackoverflow.com/talent : Error with Feature-Policy header: Unrecognized feature: 'speaker'.","level":"warn"}

```
Console(ex):

![result](https://www.linkpicture.com/q/capture.png "result")
