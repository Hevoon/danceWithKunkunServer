module.exports = () => {
    return async (ctx, next) => {
        let startTime = new Date().getTime();
        await next();
        let endTime = new Date().getTime();
        console.log(`响应时间${endTime - startTime}ms`);
    }
};