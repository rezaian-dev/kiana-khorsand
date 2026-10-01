"use server";

import { bookingSchema, changeSchema, rescheduleSchema, statusSchema } from "../../lib/mutations";
import { runAction } from "../result";
import { createAppointment, cancelAppointment, rescheduleAppointment, updateStatus } from "../repos/appointments";

export async function bookAppointment(input: unknown) { return runAction(bookingSchema, input, createAppointment); }
export async function cancelBooking(input: unknown) { return runAction(changeSchema, input, cancelAppointment); }
export async function moveAppointment(input: unknown) { return runAction(rescheduleSchema, input, rescheduleAppointment); }
export async function changeStatus(input: unknown) { return runAction(statusSchema, input, updateStatus); }
