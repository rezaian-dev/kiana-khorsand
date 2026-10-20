/** Native field paint and focus states; no JS/client boundary is needed for keyboard or no-JS forms. */
export const fieldPolishClassName =
  "[&_:is(input:not([type=checkbox]):not([type=radio]),textarea,select):focus]:[outline:none]! " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]),textarea,select):focus]:[border-color:#168f88] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]),textarea,select):focus]:[box-shadow:0_0_0_3px_rgb(255_255_255_/_94%),0_0_0_5px_rgb(24_148_144_/_25%),0_10px_28px_-14px_rgb(23_104_126_/_26%)] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]),textarea,select):focus]:[transition:border-color_.2s_ease,box-shadow_.2s_ease] " +
  "dark:[&_:is(input:not([type=checkbox]):not([type=radio]),textarea,select):focus]:[border-color:#65d7c7] " +
  "dark:[&_:is(input:not([type=checkbox]):not([type=radio]),textarea,select):focus]:[box-shadow:0_0_0_3px_rgb(20_28_37_/_95%),0_0_0_5px_rgb(86_204_191_/_42%),0_10px_28px_-14px_rgb(4_158_164_/_36%)] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select)]:[box-shadow:inset_0_1px_0_rgb(255_255_255_/_55%),0_1px_2px_rgb(24_59_75_/_8%),0_10px_24px_-19px_rgb(24_97_113_/_32%)] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select)]:[transition:border-color_.2s_ease,box-shadow_.2s_ease,background-color_.2s_ease] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select):hover:not(:focus)]:[box-shadow:inset_0_1px_0_rgb(255_255_255_/_62%),0_2px_6px_rgb(24_59_75_/_9%),0_12px_26px_-16px_rgb(24_97_113_/_34%)] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select):focus-visible]:[outline:none]! " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select):focus-visible]:[border-color:#148b80] " +
  "[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select):focus-visible]:[box-shadow:0_0_0_1px_var(--surface,#fff),0_0_0_4px_rgb(20_139_128_/_23%),0_14px_32px_-16px_rgb(19_115_139_/_42%),inset_0_1px_0_rgb(255_255_255_/_70%)] " +
  "dark:[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select):focus-visible]:[border-color:#65d7c7] " +
  "dark:[&_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select):focus-visible]:[box-shadow:0_0_0_1px_var(--surface,#221c32),0_0_0_4px_rgb(101_215_199_/_36%),0_14px_32px_-16px_rgb(4_158_164_/_40%)] " +
  "motion-reduce:[&_:is(input,textarea,select)]:[transition:none]";

/** The original reduced-motion guard also covers non-form public controls. */
export const fieldReducedMotionClassName =
  "motion-reduce:[&_:is(input,textarea,select)]:[transition-duration:.01ms]!";
