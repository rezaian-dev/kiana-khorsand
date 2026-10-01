"use server";

import { messageSchema } from "../../lib/message";
import { messageEditSchema } from "../../lib/mutations";
import { runAction } from "../result";
import { createMessage, updateMessage } from "../repos/messages";

export async function sendMessage(input: unknown) { return runAction(messageSchema, input, createMessage); }
export async function changeMessage(input: unknown) { return runAction(messageEditSchema, input, updateMessage); }
