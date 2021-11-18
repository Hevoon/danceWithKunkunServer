module.exports = () => {
    function render(json) {
        this.set("Content-Type", "application/json");
        this.body = JSON.stringify(json);
    }

    return async (ctx, next) => {
        await next();
    }
};