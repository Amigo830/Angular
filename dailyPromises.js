//Async and await : handle promises and asynchronous functions
const API = "https://api.github.com/users/rishitha80"
async function notSyncFunc(){
    try{
    const data = await fetch(API)
    const jsonValue = await data.json();
    console.log(jsonValue);
    //fetch(API).then((res)=>res.json()).then((val)=> console.log(val))
    }
    catch(err){
        console.log(err);
    }
}
notSyncFunc()

const pr = new Promise((resolve, reject)=> resolve("This is a asynchronous function"))
pr.then((msg)=> console.log(msg))