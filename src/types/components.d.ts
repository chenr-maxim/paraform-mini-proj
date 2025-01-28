import { ReactNode } from "react";

export interface ILayoutProps {
  children: ReactNode;
}

export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  resume: File | null;
}

export interface IFormLabel {
  id: string;
  title: string;
  type?: "text" | "email" | "file" | "textarea";
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IOffice {
  id: number;
  name: string;
}

export interface IJob {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  offices?: IOffice[];
  departments?: IDepartment[];
  [key: string]: unknown;
}

export interface IJobPost {
  id: number;
  active?: boolean;
  title: string;
  location: {
    name: string;
  };
  first_published_at: string;
  content?: string;
  updated_at: string;
  created_at: string;
  questions: {
    label: string;
    name: string;
    type: string;
  }[];
}
