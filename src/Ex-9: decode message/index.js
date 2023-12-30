/*
* I B C A L K A
* D R F C A E A
* G H O E L A D
*/ 


//direction = 0 / means down,
// direction = 1 / means up
function move(x, y, moveArr, direction, currentPath) {
    let xLength = moveArr[0].length;
    let yLength = moveArr.length;

    if(isEndCondition(x, xLength)) {
        return;
    } else {
        currentPath.push(moveArr[y][x]);
        const newDirections = getNewDirection(x, y, direction, yLength);
        move(newDirections.newX, newDirections.newY, moveArr, newDirections.direction, currentPath);
    }
}

function isEndCondition(currentX, xLength) {
    if(currentX >= xLength) {
        return true;
    }
    return false;
}

function getNewDirection(currentX, currentY, direction, yLength) {
    let newX, newY;
    newX = currentX + 1;
    if(direction === 0) {
        newY = currentY + 1;
        if(newY >= yLength) {
            return {
                newX,
                newY: currentY - 1,
                direction: 1
            }
        }
    } else {
        newY = currentY - 1;
        if(newY < 0) {
            return {
                newX,
                newY: currentY + 1,
                direction: 0
            }
        }
    }
    return {
        newX,
        newY,
        direction
    }
}

function main() {
    const currentPath = [];
    // const moveArr = [
    //     ['I','B','C','A','L','K','A'],
    //     ['D','R','F','C','A','E','A'],
    //     ['G','H','O','E','L','A','D']
    // ]

    const moveArr = [
        [],
    ]
    move(0, 0, moveArr, 0, currentPath);
    console.log(currentPath, "currentPath: " + currentPath);
}

main();