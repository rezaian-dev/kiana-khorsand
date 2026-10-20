"use server";

import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { auth } from "@/lib/auth";
import { collection } from "@/db/collections";
import { mongoClient } from "@/db/client";
import { parseSiteForm } from "@/validations/admin-settings";

function slotsBetween(start: string, end: string) {
  const first = Number(start.slice(0, 2)) * 60 + Number(start.slice(3));
  const last = Number(end.slice(0, 2)) * 60 + Number(end.slice(3));
  const slots: string[] = [];
  for (
    let value = first;
    value + 30 <= last && slots.length < 24;
    value += 60
  ) {
    slots.push(
      `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`,
    );
  }
  return slots;
}

export async function saveAdminReferenceSettings(form: FormData) {
  await requireAdmin();
  const services = await collection("services")
    .find({}, { projection: { slug: 1 } })
    .sort({ slug: 1 })
    .limit(31)
    .toArray();
  const parsed = parseSiteForm(
    form,
    services.map((item) => item.slug),
  );
  if (!parsed || services.length > 30)
    redirect("/admin/settings?error=invalid");
  const { days, sessions, notifications, ...fields } = parsed;
  const transaction = mongoClient.startSession();
  try {
    await transaction.withTransaction(async () => {
      await collection("settings").updateOne(
        { _id: "site" },
        {
          $set: {
            "profile.name": fields.profileName,
            "profile.title": fields.profileTitle,
            "profile.bio": fields.profileBio,
            "contact.phone": fields.contactPhone,
            "contact.email": fields.contactEmail,
            "contact.address": fields.contactAddress,
            "contact.instagram": fields.instagram,
            "contact.telegram": fields.telegram,
            "contact.whatsapp": fields.whatsapp,
            cancellation: fields.policy,
            notifications,
            "images.logo": fields.assetLogo || null,
            "images.favicon": fields.assetFavicon || null,
            "images.hero": fields.assetHero || null,
            "images.portrait": fields.assetAbout || null,
            "images.og": fields.assetOg || null,
          },
        },
        { session: transaction },
      );
      for (const day of days) {
        const old = await collection("availability").findOne(
          { key: day.key },
          { session: transaction },
        );
        const slots = !day.on
          ? []
          : old &&
              old.start === day.from &&
              old.end === day.to &&
              old.slots.length
            ? old.slots
            : slotsBetween(day.from, day.to);
        const weekday = {
          sat: 6,
          sun: 0,
          mon: 1,
          tue: 2,
          wed: 3,
          thu: 4,
          fri: 5,
        }[day.key];
        await collection("availability").updateOne(
          { key: day.key },
          {
            $set: { weekday, start: day.from, end: day.to, slots },
            $setOnInsert: { key: day.key, blocks: [] },
          },
          { upsert: true, session: transaction },
        );
      }
      for (const session of sessions) {
        await collection("services").updateOne(
          { slug: session.slug },
          {
            $set: {
              name: session.name,
              duration: session.duration,
              price: session.price,
            },
          },
          { session: transaction },
        );
      }
    });
  } catch {
    redirect("/admin/settings?error=save");
  } finally {
    await transaction.endSession();
  }
  for (const path of [
    "/admin/settings",
    "/admin/availability",
    "/admin/services",
    "/book",
    "/fees",
    "/contact",
    "/cancellation",
    "/",
  ])
    revalidatePath(path);
  for (const tag of ["settings", "availability", "services"])
    revalidateTag(tag, "max");
  redirect("/admin/settings?saved=1");
}

export async function revokeOtherAdminSessions() {
  await requireAdmin();
  await auth.api.revokeOtherSessions({ headers: await headers() });
  redirect("/admin/settings?revoked=1");
}
