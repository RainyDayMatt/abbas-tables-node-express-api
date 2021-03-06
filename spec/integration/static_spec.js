const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
    describe("GET /", () => {
        it("Should return status code 200.", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
        it("Should return JSON containing 'Test.'", (done) => {
            request.get(base, (err, res, body) => {
                expect(body).toContain("Test");
                done();
            });
        });
    });
});