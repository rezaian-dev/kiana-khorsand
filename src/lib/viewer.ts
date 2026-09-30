import { roles } from "@/lib/constants";

export type Viewer = Readonly<{
  name: string;
  email: string;
  role: (typeof roles)[keyof typeof roles];
  appointments: number;
}>;
