import { TemplateResult } from "lit";

export type LitStory<WC = any> = { args: WC; story: (args: WC) => TemplateResult; source?: string; storyName?: string };
