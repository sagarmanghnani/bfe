class Stack {
    _stack = [];
    push(value) {
        this._stack.push(value);
    }

    pop() {
        this._stack.pop();
    }

    peek() {
        return this._stack[this._stack.length - 1];
    }

    size() {
        return this._stack.length;
    }
}

class Queue {
    _maintainedQueue = new Stack();
    enqueue(value) {
        const currentQueueSize = this._maintainedQueue.size();
        const _stack = new Stack();
        for(let i = 0;i < currentQueueSize; i++) {
            _stack.push(this._maintainedQueue.peek());
            this._maintainedQueue.pop();
        }
        // reinserting in correct order for maintaining queue
        this._maintainedQueue.push(value);
        for(let k = 0; k < currentQueueSize; k++) {
            this._maintainedQueue.push(_stack.peek());
            _stack.pop();
        }
    }

    dequeue() {
        this._maintainedQueue.pop();
    }

    peek() {
        return this._maintainedQueue.peek();
    }

    size() {
        return this._maintainedQueue.size();
    }

    printAll() {
        console.log(this._maintainedQueue);
    }
}

const newQueue = new Queue();

newQueue.enqueue(1);
newQueue.enqueue(2);
newQueue.enqueue(3);
newQueue.enqueue(4);
// newQueue.printAll();
newQueue.dequeue();
newQueue.dequeue();
newQueue.enqueue(5);
newQueue.enqueue(6);
newQueue.printAll();

