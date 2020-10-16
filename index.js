const tourist=require('./src/core')

const login=require('./src/authentication');


(async()=>
{
    var cookies= await login("http://example.com");

    console.log(cookies[1]);

    tourist("http://example.com",cookies);

})();
