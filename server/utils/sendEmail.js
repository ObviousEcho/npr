const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: 465,
  //   secure: true,
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMIAL_PASSWORD,
  },
});
