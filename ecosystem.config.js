module.exports = {
  apps: [
    {
      name: "forge-scale-api",
      script: "dist/server.js",
      cwd: "./server",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      // PM2 does NOT automatically load .env files.
      // All required production variables must be listed here.
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      log_file: "logs/combined.log",
      time: true,
    },
  ],
};
