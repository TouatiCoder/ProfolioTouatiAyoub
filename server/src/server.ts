// Load env vars FIRST — before any other imports that might use them
import "./config/env";

import app from "./app";
import { env } from "./config/env";
import { prisma } from "./prisma/client";

async function bootstrap() {
  try {
    // Verify database connection on startup
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
      console.log(`   Environment: ${env.NODE_ENV}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received — shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});

bootstrap();
