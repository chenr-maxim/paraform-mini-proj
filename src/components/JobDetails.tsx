"use client";

import React from "react";
import styles from "../styles/job-details.module.scss";
import { IJobPost } from "@/types/components";

interface JobDetailsProps {
  job: IJobPost;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  const formattedDate = new Date(job.first_published_at).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className={styles["job-details-container"]}>
      <div className={styles["job-header"]}>
        <div className={styles["company-info"]}>
          <div>
            <span className={styles["hiring-status"]}>
              {job.active ? `🟢 Actively Hiring` : `Not Hiring`}
            </span>
          </div>
        </div>
      </div>

      <h1 className={styles["job-title"]}>{job.title}</h1>
      <p className={styles["job-meta"]}>
        <span>Full Time</span> | {job.location?.name || "Not specified"} |
        Posted: {formattedDate}
      </p>

      <p className={styles["job-summary"]}>{job.content}</p>

      <div className={styles["job-details-grid"]}>
        {[
          { title: "Job ID", info: job.id },
          {
            title: "Updated",
            info: new Date(job.updated_at).toLocaleDateString(),
          },
          {
            title: "Created",
            info: new Date(job.created_at).toLocaleDateString(),
          },
        ].map(({ title, info }) => (
          <div key={title}>
            <h4 className={styles["details-heading"]}>{title}</h4>
            <p>{info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetails;
