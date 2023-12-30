function sequence(asyncFunctions) {
    return async (callBack, initialData) => {
        let result = initialData;
        for await(const asyncFunction of asyncFunctions) {
            try {
                result = await asyncFunction(callBack, result);
            } catch (err) {
                await callBack(err, result);
                break;
            }
        }
        return result;
    }
}

const times2 = (data) => {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = data * 2
            resolve(result);
        }, 1000);
    })
    return promise1;
}

const times3 = (data) => {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = data * 3
            resolve(result);
        }, 1000);
    })
    return promise1;
}

const times2Error = (data) => {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = data * 2
            reject(new Error(result));
        }, 1000);
    })
    return promise1;
}
const callBack = (data) => console.log(data);
const result = sequence([times2, times3])(callBack, 2);
const printData = async () => {
    const result = await sequence([times2, times3])(callBack, 2);
    console.log(result);
}

printData();  