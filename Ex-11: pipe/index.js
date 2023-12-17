
function pipe(callBacks) {
    return (initialArgument) => {
        let argumentToPass = initialArgument;
        for(let i = 0; i < callBacks.length;i++) {
            argumentToPass = callBacks[i](argumentToPass);
        }
        return argumentToPass;
    }
}

console.log(pipe([])(1));