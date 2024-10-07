cart = ["shoes", "pants", "kurtis"]

const promise = createOrder(cart)
promise
.then(function(){
    console.log(orderId);
    return proceedToPayment(orderId)
})
.then(function(msg){
    console.log("The message from the payment api is " + msg);
})
.catch(function(err){
    console.log(err.message);
})



function proceedToPayment(orderId){
    return new Promise(function(resolve, reject){
        if(orderId=== 12345)
        resolve("Payment Successful")
        else
        reject(new Error("Order is not correct "))
    })

}


//**example of promise chaining
// createOrder(cart)
// .then(()=> proceedToPayment())
// .then(()=> displaySummary())


//how to create a promise : we use promise constructor which has the call back function that has resolve, reject parameters : when the api call is successfull we will use resolve() method 
//when it is failed we will use reject() 


//create order
function createOrder(){
const pr = new Promise(function(resolve, reject){
    //cart validation
    //generate order id by calling cretae order api
    if(!validateCart()){
        const err = new Error("cart is not valid")
        reject(err)
    }
    else{
        orderId = 12345,
        setTimeout(function(){
            resolve(orderId);
        }, 5000)
    }
})
return pr
}

function validateCart(){
    return false;
}