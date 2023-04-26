const config = module.exports;
require("dotenv").config();

config.express = {
    ip: process.env.IP,
    port: process.env.PORT,
};
