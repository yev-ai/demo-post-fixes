import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const memoryUsage = process.memoryUsage();
  const ramUsedMB = (memoryUsage.rss / 1024 / 1024).toFixed(2);
  const ramTotalMB = (os.totalmem() / 1024 / 1024).toFixed(2);

  const response = {
    uptime_seconds: process.uptime().toFixed(3),
    ram: {
      used_mb: ramUsedMB,
      total_mb: ramTotalMB,
    },
  };

  return NextResponse.json(response, {
    status: 200,
  });
}
