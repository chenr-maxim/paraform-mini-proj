import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const token = Buffer.from(process.env.API_KEY + ":").toString("base64");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.GREENHOUSE_URL}/candidates`,

      {
        first_name: body.first_name || "John",
        last_name: body.last_name || "Doe",
        applications: [
          {
            job_id: body.job_id || `${process.env.JOB_ID}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
          "On-Behalf-Of": `${process.env.USER_ID}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError;

    console.error(
      "Error creating candidate:",
      err.response?.data || err.message
    );

    return NextResponse.json(
      { error: "Failed to fetch job post", details: err.message },
      { status: err.response?.status || 500 }
    );
  }
}
