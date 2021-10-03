var request = require("request");

module.exports = function (req, res, next) {
  let { email } = req.body;
  request(
    `https://realemail.expeditedaddons.com/?api_key=
          ${process.env.REALEMAIL_API_KEY}
          &email=${email}&valid=true&is_freemail=true&domain_error=true`,
    function (error, response, body) {
      console.log("Status:", response.result);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
    }
  );
  next();
};
