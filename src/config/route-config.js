module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const propertyRoutes = require("../routes/properties");
        const servingSummaryRoutes = require("../routes/servingSummaries");
        const staffMemberRoutes = require("../routes/staffMembers");
        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(propertyRoutes);
        app.use(servingSummaryRoutes);
        app.use(staffMemberRoutes);
    }
};
