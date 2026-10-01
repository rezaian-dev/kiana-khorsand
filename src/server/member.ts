import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getViewer } from "./viewer";
import { getSession } from "./session";
import { listAppointments } from "./repos/appointments";
import { appointmentSchema, idSchema, phoneSchema } from "@/lib/records";
import { revisionSchema } from "@/lib/mutations";
import { appointmentStates, routes } from "@/lib/constants";
import type { Member } from "@/lib/member";
import type { Visit, VisitQuery, Visits } from "@/lib/visits";

const visitSchema = z.object({
  service: appointmentSchema.shape.service, status: appointmentSchema.shape.status,
  startsAt: z.date(), endsAt: z.date(), revision: revisionSchema,
}).refine((value) => value.endsAt > value.startsAt);

export const readMember = cache(async (): Promise<Member> => {
  await connection();
  const viewer = await getViewer();
  if (!viewer) redirect(routes.login);
  const session = await getSession();
  if (!session) redirect(routes.login);
  return { ...viewer, phone: phoneSchema.parse(session.user.phone ?? ""), isEmailVerified: session.user.emailVerified };
});

export const readVisits = cache(async (scope: VisitQuery["scope"], page: number): Promise<Visits> => {
  await connection();
  await readMember();
  // The repository rechecks the session and always filters by its user ID, even for admins.
  const result = await listAppointments({ scope, page });
  const entries: Visit[] = result.entries.map((record) => {
    const value = visitSchema.parse(record);
    return {
      id: idSchema.parse(record._id.toHexString()), revision: value.revision, service: value.service, status: value.status,
      startsAt: value.startsAt.toISOString(), endsAt: value.endsAt.toISOString(),
      canCancel: (value.status === appointmentStates.pending || value.status === appointmentStates.confirmed) && value.startsAt > result.checkedAt,
    };
  });
  return { entries, count: result.count, pageCount: result.pageCount, query: result.query };
});
