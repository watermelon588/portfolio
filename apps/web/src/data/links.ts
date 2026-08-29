/**
 * ==========================================================================
 * GLOBAL LINKS & SOCIALS CONFIG ("GLOBAL KNOB")
 * Single centralized source of truth for all contact links, social profiles,
 * and project repositories.
 *
 * Edit any link or API key here to update it everywhere across the application instantly!
 * ==========================================================================
 */

export const GLOBAL_LINKS = {
  // Primary Contact Information
  email: "maityrohit021@gmail.com",

  // Web3Forms Access Key for direct email delivery to maityrohit021@gmail.com
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || "656aa372-69dc-4538-9589-82376c182405",

  // Social Media Profiles
  github: "https://github.com/watermelon588",
  linkedin: "https://www.linkedin.com/in/maity-rohit?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  twitter: "https://x.com/turquoise_0904",
  instagram: "https://www.instagram.com/rohit_0.0?igsi=MW1vb3poNWQxbzVydw==",
  discord: "toiletduck69",
  discordUrl: "https://discord.com",

  // Project GitHub Repositories
  projects: {
    skyguide: "https://github.com/watermelon588/skyguide-ai",
    forcastr: "https://github.com/watermelon588/FORCASTR",
    neuron: "https://github.com/watermelon588/Neuron",
    yapchat: "https://github.com/watermelon588/Yap-Chat",
  },

  // Project Live Demos / Deployed Links
  live: {
    skyguide: "https://skyguide-ai.vercel.app",
    forcastr: "https://forcastr-wheat.vercel.app",
    neuron: undefined as string | undefined,
    yapchat: "https://yap-chat-five.vercel.app",
  },
} as const;

export default GLOBAL_LINKS;
