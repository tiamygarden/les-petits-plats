export default () => {
    const start = new Date();
    return {
        stop: function () {
            const end = new Date();
            const time = end.getTime() - start.getTime();
            console.log('finished in', time, 'ms');
        }
    }
}