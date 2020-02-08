module.exports = {
    normalizePort(value) {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            return 3000;
        } else {
            return parsedValue;
        }
    }
};
