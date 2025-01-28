import React from "react";
import axios from "axios";

import styles from "../../../styles/job-post-details.module.scss";
import ApplicationForm from "@/components/ApplicationForm";
import JobDetails from "@/components/JobDetails";

interface JobDetailsProps {
  params: { id: string };
}

const fetchJobDetails = async (id: string) => {
  const token = Buffer.from(`${process.env.API_KEY}:`).toString("base64");

  try {
    const response = await axios.get(
      // `${process.env.GREENHOUSE_URL}/jobs/${process.env.JOB_ID}/job_posts`,
      // `${process.env.GREENHOUSE_URL}/job_posts/${process.env.JOB_ID}`,
      `${process.env.GREENHOUSE_URL}/jobs/${id}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
};

const fetchSampleJobPostDetails = async () => {
  const token = Buffer.from(`${process.env.API_KEY}:`).toString("base64");

  try {
    const response = await axios.get(
      `${process.env.GREENHOUSE_URL}/job_posts/${process.env.SAMPLE_JOB_POST_ID}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
};

const JobPostDetailsPage = async ({ params }: JobDetailsProps) => {
  const job = await fetchJobDetails(params.id);
  const sampleJobPost = await fetchSampleJobPostDetails();

  console.log(sampleJobPost, "sampleJobPost");
  return (
    <div className={styles["job-post-details-container"]}>
      <div className={styles["job-post-details"]}>
        <JobDetails job={sampleJobPost} />
      </div>
      <ApplicationForm job={job} />
    </div>
  );
};

export default JobPostDetailsPage;
