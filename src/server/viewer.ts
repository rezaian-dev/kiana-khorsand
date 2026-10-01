import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { getSession } from "./session";
import { countAppointments } from "./repos/appointments";
import { roles } from "../lib/constants";
import type { Viewer } from "../lib/viewer";

export const getViewer = cache(async function readViewer(): Promise<Viewer | null> {
  await connection();
  const session = await getSession();
  if (!session) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email,
    role: session.user.role === roles.admin ? roles.admin : roles.client,
    appointments: await countAppointments(),
  };
});
