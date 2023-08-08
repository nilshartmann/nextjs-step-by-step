import { NextRequest, NextResponse } from "next/server";
import { AddRatingRequestBody } from "@/app/types";
import prisma from "@/app/lib/prisma";
import { v4 as uuid } from "uuid";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { hello: "next.js" },
    {
      status: 200,
    }
  );
}
