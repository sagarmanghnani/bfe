
// executorCallback = (resolve, reject) => void;
class MyPromise {
    registerThenCallBack = [];
    registerRejectCallBack = [];
    objThis = this;

    static resolve(value) {
        // here we need to write the logic, that, when this function is called
        // it needs to call then method
        if(this.registerThenCallBack.length) {
            const successCallback = this.registerThenCallBack[0];
            successCallback(value);
        }
    }

    static reject(value) {
        if(this.registerRejectCallBack.length) {
            const rejectCallback = this.registerRejectCallBack[0];
            rejectCallback(value);
        } else if(this.registerThenCallBack.length > 1) {
            const rejectCallback = this.registerRejectCallBack[0];
            rejectCallback(value);
        }
    }

    constructor(executorCallBack) {
        if(executorCallBack) {
            const resolve = (value) => MyPromise.resolve.apply(this.objThis, [value]);
            const reject = (value) => MyPromise.reject.apply(this.objThis, [value]);
            if(typeof executorCallBack === 'function') {
                executorCallBack(resolve, reject)
            } else {
                resolve(executorCallBack)
            }
        }
    }

    then(successCallback, rejectCallback) {
        const newPromiseToReturn = new MyPromise();
        // this augmentation is done so as to make the chaining, since we are returning new promise
        const augmentedSuccessCallBack = (value) => {
            const newValue = successCallback(value);
            if(!(newValue instanceof MyPromise) && newPromiseToReturn.registerThenCallBack.length) {
                newPromiseToReturn.registerThenCallBack[0](newValue);
            } else if(newValue instanceof MyPromise) {
                newValue.then((value) => {
                    newPromiseToReturn.registerThenCallBack[0](value);
                })
            }
        }
        this.registerThenCallBack = [augmentedSuccessCallBack, rejectCallback];
        return newPromiseToReturn;
    }

    catch(failureCallBack) {
        const newPromiseToReturn = new MyPromise();
        this.registerRejectCallBack = [failureCallBack];
        return newPromiseToReturn;
    }
    
}

const checkPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log("Timeout now happened....");
        resolve(23);
    }, 1000)
}).then((value) => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            console.log("New timeout addedd");
            resolve();
        }, 2000);
    });
}).then((value) => {
    console.log("Second time calling bhaya....", value);
    return 3 * value;
}).then((value) => {
    console.log("Third time calling bhaya....", value)
    return 4 * value;
}).then((value) => {
    console.log("final value bhaya", value);
});

console.log(checkPromise instanceof MyPromise)