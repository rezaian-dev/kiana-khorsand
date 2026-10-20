export type AdminFeedback = {
  error: string;
  success: string;
  id?: string;
  draft?: { body: string; meetUrl: string };
};
