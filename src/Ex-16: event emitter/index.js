

class EventEmitter {
    _subscriberMap = new Map();
    temp = new Set();

    getCallBackSet(eventName) {
        const callBackMap= (this._subscriberMap.has(eventName) && this._subscriberMap.get(eventName)) || new Map();
        return callBackMap
    }

    subscribe(eventName, callBack) {
        if(!eventName || !callBack) return;
        const callBackMap = this.getCallBackSet(eventName);
        let count = 0;
        count = (callBackMap.has(callBack) && callBackMap.get(callBack)) || 0;
        callBackMap.set(callBack, count + 1);
        this._subscriberMap.set(eventName, callBackMap);
        return {
            release: () => {
                const callBackMap = this.getCallBackSet(eventName);
                count = (callBackMap.has(callBack) && callBackMap.get(callBack));
                if (count === 0) {
                    callBackMap.delete(callBack);
                } else {
                    callBackMap.set(callBack, count - 1);
                }
            }
        }
    }

    emit(eventName, ...args) {
        const callBackMap = this.getCallBackSet(eventName);
        for(const [callBack, count] of callBackMap) {
            for(let i = 0; i < count; i++) {
                callBack.apply(this, args);
            }
        }
    }
}

const callBack1 = (...args) => {
    console.log(args, "callBack1");
}

const callBack2 = (...args) => {
    console.log(args, "callBack2");
}
const emitter = new EventEmitter();
const sub1  = emitter.subscribe('event1', callBack1);
const sub2 = emitter.subscribe('event2', callBack2);
const sub3 = emitter.subscribe('event1', callBack1);

emitter.emit('event1', 1, 2);
sub1.release();
emitter.emit('event1', 3, 4);



