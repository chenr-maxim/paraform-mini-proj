import React from "react";
import Link from "next/link";
import { IJob } from "@/types/components";

import styles from "../styles/single-job-listing.module.scss";

interface SingleJobListingProps {
  job: IJob;
}

function extractFields(job: IJob) {
  const officeLocation = job.offices?.[0]?.name;
  const departmentName = job.departments?.[0]?.name;

  return { officeLocation, departmentName };
}

const SingleJobListing = ({ job }: SingleJobListingProps) => {
  const { officeLocation, departmentName } = extractFields(job);
  return (
    <Link
      href={`/job-post/${job.id}`}
      className={styles["single-job-listing-row"]}>
      <span>{job.name}</span>
      <span>{officeLocation}</span>
      <span>{departmentName}</span>
    </Link>
  );
};

export default SingleJobListing;
