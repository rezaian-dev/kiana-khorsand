// The editorial sliders keep their shared geometry but paint themselves with
// site-canvas and graphite/teal palettes under the existing theme.
export const neonCarouselSectionClassName =
  "isolate overflow-hidden bg-[var(--bg)]! text-[#24444a] dark:bg-[var(--bg)]! dark:text-[#e9f7f2] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:[background-image:radial-gradient(ellipse_55%_75%_at_90%_22%,rgba(92,179,157,.045),transparent_78%),radial-gradient(ellipse_55%_75%_at_5%_85%,rgba(105,173,174,.035),transparent_75%)] dark:before:[background-image:radial-gradient(ellipse_55%_75%_at_90%_22%,rgba(33,117,113,.08),transparent_78%),radial-gradient(ellipse_55%_75%_at_5%_85%,rgba(14,80,87,.07),transparent_75%)] before:content-['']";

// Editorial actions are indigo/blue, not green; card accents stay separate.
export const neonCarouselLinkClassName =
  "border-[#a6bce2]! bg-[#eef2fe]! text-[#2b4f83]! [box-shadow:0_0_0_1px_#b4c5eb5c,inset_0_1px_0_#fff,0_10px_30px_-18px_#5e7bbb72]! hover:border-[#6f95d5]! hover:bg-[#dfe8fb]! hover:text-[#213f70]! focus-visible:outline-[#4265a9]! dark:border-[#6474a5]! dark:bg-[#232944]! dark:text-[#e3eaff]! dark:[box-shadow:0_0_0_1px_#7185ba5c,inset_0_1px_0_#ffffff24,0_10px_30px_-18px_#6a80b380]! dark:hover:border-[#98addf]! dark:hover:bg-[#30385a]! dark:hover:text-white! dark:focus-visible:outline-[#adbfef]!";

export const neonCarouselControlClassName =
  "border-[#a8bce0]! bg-[#f0f3fd]! text-[#345283]! [box-shadow:inset_0_1px_0_#fff,0_6px_20px_-11px_#5b78a578]! hover:border-[#7094d1]! hover:bg-[#dce6fa]! hover:text-[#223e71]! hover:[background-image:none]! hover:[box-shadow:0_0_0_4px_#7e9cda30,0_0_20px_-5px_#7a97d28c]! disabled:text-[#758aaa]! disabled:[box-shadow:none]! focus-visible:outline-[#4569aa]! dark:border-[#6173a0]! dark:bg-[#242c46]! dark:text-[#e1e9fb]! dark:[box-shadow:inset_0_1px_0_#ffffff24,0_6px_20px_-11px_#4e70ab]! dark:hover:border-[#a6b9e5]! dark:hover:bg-[#374365]! dark:hover:text-white! dark:hover:[box-shadow:0_0_0_4px_#819de133,0_0_20px_-5px_#8ba5e182]! dark:disabled:text-[#b4c0d9]! dark:disabled:hover:text-[#b4c0d9]! dark:focus-visible:outline-[#bccbf1]!";

export const neonArticleCardClassName =
  "[--art-surface:#f8fcf9]! [&&]:[background:linear-gradient(155deg,#fff,#f0f8f3)]! [&&]:border-[#a3c9bd]! [box-shadow:inset_0_1px_0_#fff,0_20px_45px_-22px_#63978a52]! [&&]:hover:border-[#5eab99]! hover:[box-shadow:inset_0_1px_0_#fff,0_25px_55px_-25px_#63978a87,0_0_23px_-8px_#5cae9b85]! focus-visible:outline-[#247d72]! dark:[--art-surface:#172e33]! dark:[&&]:[background:linear-gradient(155deg,rgba(32,56,59,.96),rgba(20,39,45,.98))]! dark:[&&]:border-[#4e8b83]! dark:[box-shadow:inset_0_1px_0_#ccfff01c,0_20px_45px_-19px_#030d11b8]! dark:[&&]:hover:border-[#82edd2]! dark:hover:[box-shadow:inset_0_1px_0_#ccfff025,0_25px_55px_-22px_#020b10,0_0_23px_-8px_#5ce0c095]! dark:focus-visible:outline-[#9af2dd]!";

export const neonArticleActiveClassName =
  "[&&]:border-[#58a696]! [box-shadow:inset_0_1px_0_#fff,0_23px_52px_-21px_#427e7766,0_0_32px_-16px_#79c7af70]! dark:[&&]:border-[#9be6ce]! dark:[box-shadow:inset_0_1px_0_#e1fff438,0_23px_52px_-19px_#020b10d9,0_0_32px_-13px_#53ddbba3]!";
