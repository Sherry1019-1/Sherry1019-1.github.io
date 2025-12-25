const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "http://localhost:8080", // 必须和启动端口一致
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
  },
});