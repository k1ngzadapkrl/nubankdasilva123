import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        ok: true,
        message: "auth api online",
    });
}

export async function POST() {
    return NextResponse.json({
        ok: true,
        message: "post received",
    });
}
