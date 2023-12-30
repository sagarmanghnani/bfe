const findCorrespondingNode = (rootA, rootB, target) => {
    let correspondingNode = null
    if(!rootA | !rootB || !target) return correspondingNode;
    // if(!childrenOfRootA?.length)
    console.log("Ha Ha Ha")
    const val =  traverseDfs(rootA, rootB, target);
    console.log(val, "val");
    return val;
}

const traverseDfs = (nodeA, nodeB, target) => {
    if(!nodeA || !nodeB || !target) return;
    const childrenOfRootA = nodeA.children;
    const childrenOfRootB = nodeB.children;
    if(nodeA === target) {
        return nodeB;
    } else {
        if(!childrenOfRootA?.length) return;
        let foundNode;
        for(let i = 0;i < childrenOfRootA.length; i++) {
            foundNode = traverseDfs(childrenOfRootA[i], childrenOfRootB[i], target);
            if(foundNode) {
                return foundNode;
            }
        }
        return foundNode ?? null;
    }
}


const helloworldtree = document.getElementById('helloworld');
const helloworldtree2 = helloworldtree.cloneNode();
const target = document.getElementById('child3');

findCorrespondingNode(helloworldtree, helloworldtree2, target);
