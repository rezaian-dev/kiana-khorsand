import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import betterTailwind from "eslint-plugin-better-tailwindcss";

// The upstream Next 16.4 ESLint plugin currently pulls in braces@3.0.3,
// which has an unpatched high-severity advisory. Keep TypeScript, React,
// Hooks and accessibility checks without that vulnerable dependency chain.
export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    // Tailwind hygiene, enforced rather than left to the editor: a class that has a
    // canonical spelling must use it (`w-[100px]` → `w-25`, `p-[1rem]` → `p-4`).
    files: ["**/*.{jsx,tsx}"],
    plugins: { "better-tailwindcss": betterTailwind },
    settings: {
      "better-tailwindcss": { entryPoint: "src/app/globals.css" },
    },
    rules: {
      "better-tailwindcss/enforce-canonical-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-deprecated-classes": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "error",
      "better-tailwindcss/enforce-consistent-important-position": "error",
      "better-tailwindcss/enforce-shorthand-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      // This site is RTL first, so anything on the inline axis — `ml/mr`, `pl/pr`,
      // `left/right`, `border-l/r`, `rounded-l/r`, `text-left/right` — must be
      // logical, or it silently breaks the moment the language flips.
      //
      // The block axis is exempt on purpose: `mt-4` and `mbs-4` compile to the same
      // declaration in a horizontal writing mode, so rewriting the whole codebase to
      // `mbs`/`mbe`/`inline-full`/`block-auto` would trade one convention every
      // reader knows for a longer one that hides the intent.
      "better-tailwindcss/enforce-logical-properties": [
        "error",
        {
          ignore: [
            "^(?:[^:\\s]+:)*-?(?:m[tb]|p[tb]|scroll-m[tb]|scroll-p[tb]|space-y|top|bottom|inset-y|inset-[tb]|border-[tb]|rounded-[tb]|text-(?:top|bottom))(-|$).*$",
            "^(?:[^:\\s]+:)*-?(?:h|w|min-h|max-h|min-w|max-w|size|translate-y)-.+$",
          ],
        },
      ],
    },
  },
]);
