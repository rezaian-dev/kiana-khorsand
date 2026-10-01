"use server";

import { recordSearchSchema } from "@/lib/clients";
import { searchRecords } from "../clients";
import { runAction } from "../result";

export async function findRecords(input: unknown) { return runAction(recordSearchSchema, input, searchRecords); }
