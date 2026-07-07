export const FORM_INPUT_CLASS =
  "border-input w-full min-w-0 rounded-md border !bg-[#ffffff] px-3 py-2 text-sm text-foreground shadow-xs outline-none " +
  "transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 " +
  "disabled:!bg-[#ffffff] disabled:opacity-75 dark:border-neutral-800 dark:!bg-neutral-950 dark:text-white"

export const FORM_TEXTAREA_CLASS =
  `${FORM_INPUT_CLASS} min-h-[6rem] resize-y py-2`

export const FORM_SELECT_CLASS = FORM_INPUT_CLASS + " cursor-pointer"

export const FORM_CHECKBOX_CLASS =
  "h-4 w-4 shrink-0 rounded-sm border border-input !bg-[#ffffff] text-primary " +
  "accent-[var(--primary)] focus:ring-2 focus:ring-primary/20 dark:!bg-neutral-950"
