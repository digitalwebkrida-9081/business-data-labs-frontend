module.exports = {
  apps: [
    {
      name: "data-scraper-frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
