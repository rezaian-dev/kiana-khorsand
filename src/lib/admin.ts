import { z } from "zod";
import { appointmentStates, messageStates } from "./constants";
import type { Service } from "@/content/services";

export const sidebarCookie = "admin-sidebar";
export const sidebarSchema = z.object({ isCollapsed: z.boolean() });
export const periodSchema = z.object({ today: z.iso.date(), start: z.date(), previous: z.date(), now: z.date() })
  .refine((value) => value.previous < value.start && value.start <= value.now);
export type AdminVisit = { id: string; name: string; service: Service["key"]; status: (typeof appointmentStates)[keyof typeof appointmentStates]; startsAt: string; endsAt: string; updatedAt: string };
export type AdminMessage = { id: string; name: string; status: (typeof messageStates)[keyof typeof messageStates]; createdAt: string; updatedAt: string };
export type DailyCount = { day: string; label: string; count: number };
export type Dashboard = {
  day: string; checkedAt: string; todayCount: number; pendingCount: number; requests: number; previousRequests: number;
  clients: number; newClients: number; previousClients: number; unread: number;
  today: AdminVisit[]; upcoming: AdminVisit[]; messages: AdminMessage[]; daily: DailyCount[];
  activity: { key: string; label: string; at: string }[];
};
