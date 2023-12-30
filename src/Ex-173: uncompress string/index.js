function uncompress(string) {
    const data =  processCompressedString(string, 0, '');
    console.log(data, "data");
}

function processCompressedString(originalString, startingPoint, currentProcessedString) {
    if(startingPoint >= originalString.length) {
        //Base condition: Nothing to process here.
        return {
            repetitionString: currentProcessedString,
            currentPosition: startingPoint
        }
    }
    let numRepetition = 0;
    let i = startingPoint;
    if(!isNaN(originalString[i])) {
        numRepetition = +originalString[i];
    }

    if(numRepetition) {
        const {repetitionString, currentPosition} = processCompressedString(originalString, i + 2);
        let strToAppend = '';
        for(let k = 0; k < numRepetition; k++) {
            strToAppend += repetitionString;
        }
        return {
            repetitionString: strToAppend,
            currentPosition
        }
    } else {
        let stringToProcess = [];
        while(i < originalString.length && isNaN(originalString[i])) {
            if(originalString[i] !== ')') {
                stringToProcess.push(originalString[i]);
            }
            i++;
        }
        const {repetitionString, currentPosition} = processCompressedString(originalString, i, currentProcessedString);
        return {
            repetitionString: stringToProcess.join('') + (repetitionString ?? ''),
            currentPosition: currentPosition
        }
    }
}

uncompress('3(2(ab)c)');