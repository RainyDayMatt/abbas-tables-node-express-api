module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const propertyRoutes = require("../routes/properties");
        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(propertyRoutes);
    }
};
