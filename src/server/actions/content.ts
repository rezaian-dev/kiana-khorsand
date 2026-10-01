"use server";

import { articleEditSchema, courseEditSchema, settingsEditSchema } from "../../lib/mutations";
import { moderationSchema } from "../../lib/queue";
import { runAction } from "../result";
import { saveArticle } from "../repos/articles";
import { saveCourse } from "../repos/courses";
import { moderateReview } from "../repos/testimonials";
import { saveSettings } from "../repos/settings";

export async function writeArticle(input: unknown) { return runAction(articleEditSchema, input, saveArticle); }
export async function writeCourse(input: unknown) { return runAction(courseEditSchema, input, saveCourse); }
export async function writeSettings(input: unknown) { return runAction(settingsEditSchema, input, saveSettings); }

export async function moderateTestimonial(input: unknown) { return runAction(moderationSchema, input, moderateReview); }
