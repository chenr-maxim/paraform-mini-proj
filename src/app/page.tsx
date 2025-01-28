import axios, { AxiosError } from "axios";
import Layout from "@/components/Layout";
import SingleJobListing from "@/components/SingleJobListing";

import styles from "../styles/app.module.scss";

async function fetchJob() {
  const token = Buffer.from(`${process.env.API_KEY}:`).toString("base64");

  try {
    const response = await axios.get(
      `${process.env.GREENHOUSE_URL}/jobs/${process.env.JOB_ID}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "Error fetching job posts:",
      err.response?.data || err.message
    );

    return {
      error: "Failed to fetch job posts",
      details: err.response?.data || err.message,
    };
  }
}

export default async function Home() {
  const job = await fetchJob();

  return (
    <Layout>
      <div className={styles["app-container"]}>
        <div className={styles["job-listings-container"]}>
          <div className={styles["job-listings-header"]}>
            <span>Title</span>
            <span>Location</span>
            <span>Department</span>
          </div>
          <div className={styles["job-listings-grid"]}>
            <SingleJobListing job={job} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
