function $(el) {
    // your code here
    const css = (propertyName, value) => {
        if(!propertyName || !value) return {
            css
        };
        el.style[propertyName] = value;
        return {
            css
        }
    }
    return {
        css
    }
}

const divElem = document.getElementById('helloworld');
const a = $(divElem);
console.log(a.css())