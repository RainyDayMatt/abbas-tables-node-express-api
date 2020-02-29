module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const propertyRoutes = require("../routes/properties");
        const servingSummaryRoutes = require("../routes/servingSummaries");
        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(propertyRoutes);
        app.use(servingSummaryRoutes);
    }
};
