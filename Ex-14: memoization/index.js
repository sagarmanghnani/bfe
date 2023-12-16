function memo(func, resolver) {
    let cacheKeyResulsts =  new Map();
    return function(...args) {
        let genKey = '';
        if(resolver) {
            genKey = resolver.apply(this, args);
        } else {
            genKey = defaultResolver(...args);
        }

        if(cacheKeyResulsts.has(genKey)) {
            return cacheKeyResulsts.get(genKey);
        }
        const output = func.apply(this, args);
        cacheKeyResulsts.set(genKey, output);
        return output
    }
}

function defaultResolver(...argsArray) {
    let generatedKey = '';
    for(let i = 0; i < argsArray.length;i++) {
        generatedKey = `${generatedKey}_${argsArray[i]}`; 
    }
    return generatedKey;
}

function resolver(...args) {
    console.log(this, "this....");
    console.log(args);
    return 'samekey';
}
