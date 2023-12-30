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

export default Stack;