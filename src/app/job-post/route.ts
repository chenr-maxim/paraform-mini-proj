import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const token = Buffer.from(`${process.env.API_KEY}` + ":").toString("base64");

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.GREENHOUSE_URL}/job_posts/`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError;

    return NextResponse.json(
      { error: "Failed to fetch job posts", details: err.message },
      { status: err.response?.status || 500 }
    );
  }
}
