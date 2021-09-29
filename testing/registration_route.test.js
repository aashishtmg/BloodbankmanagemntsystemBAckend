const express = require("express");
const request = require("supertest");

const registration = require("../routes/registrstion_route");
require("./setup");

const app = express();
app.use(express.json());
app.use("/", registration);

describe("Test for user route", () => {
  test("should be able to register a new user", () => {
    return request(app)
      .post("/bloodbank/client/register")
      .send({
        fname: "sonam",
        lname:"tamang",
        username: "sonam123",
        address: "tandi",
        email: "sonam123@gmail.com",
        phone: "983453495",
        password: "sonam",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(201);
      });
  });

  test("should not register user without username", () => {
    return request(app)
      .post("/bloodbank/client/register")
      .send({
        fname: "ashish",
        email:"ashish@gmail.com",
        address: "jutpani",
        phone: "984454385",
        password: "ashish",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(400);
      });
  });

  test("should be able to login user", () => {
    return request(app)
      .post("/bloodbank/client/login")
      .send({
        username: "sonam123",
        password: "sonam",
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
