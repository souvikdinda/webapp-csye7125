import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

const should = chai.should();

chai.use(chaiHttp);

describe("Testing GET Method", () => {
      
    it("GET health check", (done) => {
      chai
        .request(app)
        .get("/healthz")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
});