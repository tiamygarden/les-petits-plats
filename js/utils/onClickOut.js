let controller

function check(event, el, callback) {
    let target = event.target
    do {
        // This is a click inside, does nothing, just return.
        if (target === el) return;
        target = target.parentNode;
    } while (target);

    // This is a click outside.
    controller.abort()
    callback()
}

export default (el, callback) => {
    controller = new AbortController()
    document.addEventListener('click', (event) => check(event, el, callback), {signal: controller.signal})
}