import axios from "axios";

export interface CandidatePayload {
  first_name: string;
  last_name: string;
  job_id: string | undefined;
}

export const submitCandidate = async (payload: CandidatePayload) => {
  try {
    const response = await axios.post("/api/greenhouse/candidates", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.error || "Failed to submit candidate.",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred.",
        status: 500,
      };
    }
  }
};
