import { Icon } from "@phosphor-icons/react";
import { LucideIcon } from "lucide-react";

export interface User {
  id: number;
  name: string;
  email: string;
  job_position: string;
  department_name: string;
  office_name: string;
  picture: string;
  is_profile_complete: boolean;
  email_verified_at?: string;
}

export interface ToastMessage {
  type: "default" | "destructive";
  message: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface NavigationItem {
  title: string;
  url: string;
  icon?: Icon | LucideIcon,
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[]
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  flash: {
    message: ToastMessage;
  };
  enums: {
    user_departments: SelectOption[];
    user_offices: SelectOption[];
  };
  can: {
    write_posts: boolean;
    handle_announcements: boolean;
    handle_news: boolean;
    handle_communications: boolean;
    make_courses: boolean;
  };
};
