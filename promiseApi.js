const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=> reject("P1 success"), 5000)
})

const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=> reject("P2 success"), 1000)
})

const p3 = new Promise((resolve, reject)=>{
    setTimeout(()=>reject("P3 success"), 2000)
})

// You should never have the uncaught error: which means u are not aware of the error
Promise.any([p1, p2, p3])
.then((res)=> console.log(res))
.catch((err)=>{
    console.error(err);
    console.log(err.errors); // it will return the result of all the errors
})

//in case of the promise.any([]) if all the promises are failed then it will give us the aggreagted array of all the errors, it will be stored inside the errors object

