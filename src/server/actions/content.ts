"use server";

import { articleEditSchema, changeSchema, courseEditSchema, reviewEditSchema, settingsEditSchema } from "../../lib/mutations";
import { runAction } from "../result";
import { saveArticle, deleteArticle } from "../repos/articles";
import { saveCourse, deleteCourse } from "../repos/courses";
import { saveReview, deleteReview } from "../repos/testimonials";
import { saveSettings } from "../repos/settings";

export async function writeArticle(input: unknown) { return runAction(articleEditSchema, input, saveArticle); }
export async function removeArticle(input: unknown) { return runAction(changeSchema, input, deleteArticle); }
export async function writeCourse(input: unknown) { return runAction(courseEditSchema, input, saveCourse); }
export async function removeCourse(input: unknown) { return runAction(changeSchema, input, deleteCourse); }
export async function writeReview(input: unknown) { return runAction(reviewEditSchema, input, saveReview); }
export async function removeReview(input: unknown) { return runAction(changeSchema, input, deleteReview); }
export async function writeSettings(input: unknown) { return runAction(settingsEditSchema, input, saveSettings); }
