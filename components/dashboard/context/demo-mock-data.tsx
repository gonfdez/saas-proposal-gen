import { Profile, SavedFile } from "./dashboard-context";

export const mockProfiles: Profile[] = [
  {
    id: "1",
    type: "personal",
    name: "Jonh Doe",
    role: "Digital Marketing Consultant",
    valueProposition: "I help B2B companies generate qualified leads.",
    targetAudience: "Marketing Directors in technology companies.",
    toneOfVoice: "professional"
  },
  {
    id: "2",
    type: "brand",
    name: "Acme Corp",
    role: "Growth Agency",
    valueProposition: "We scale startups with growth hacking strategies.",
    targetAudience: "Startups in the growth phase.",
    toneOfVoice: "inspiring"
  }
];

export const mockSavedFiles: SavedFile[] = [
  { id: "1", type: "text_message", profileId: "1", content: "Hello TechGrowth Marketing Team! I hope this message finds you well. My name is Fulano Dominguez, Sales Director at SEO Consulting SL.\n\nI took the liberty of reaching out because I’m excited about your work and believe I have an interesting proposal for you. At SEO Consulting SL, we specialize in optimizing the online visibility of companies like yours. Imagine a significant increase in web traffic, with potential clients constantly knocking at your door.\n\nWe’ve achieved outstanding results for other clients, including an increase of over 120% in organic traffic in just four months. Our strategy includes thorough analysis, content optimization, and a solid link-building strategy.\n\nI’d love to chat with you and explain how we can boost TechGrowth’s search engine ranking. How about we schedule a brief phone conversation to explore how we can drive your results? I’m available whenever it’s convenient for you. I look forward to your response!", meta: { createdAt: new Date().toISOString() } },
  { id: "2", type: "email", profileId: "1", content: '<h2>Collaboration Proposal: SEO Boost for TechGrowth</h2>\n\n<p>Dear TechGrowth marketing team,</p>\n\n<p>I hope this email finds you well. My name is Fulano Dominguez, Sales Director at SEO Consulting SL, and I’m writing to you with a proposal that could take your online presence to the next level. At SEO Consulting SL, we specialize in monthly SEO services, including content optimization and link-building, technical audits, keyword mapping, and on-page optimization.</p>\n\n<p>We’ve achieved significant results for similar clients, such as a <strong>+120% increase in organic traffic in just four months</strong>. We’d love to replicate that success with TechGrowth.</p>\n\n<p>We understand the value of a strong SEO strategy and the direct impact it has on growth. That’s why I would greatly appreciate the opportunity to talk with you and explain how we can help you reach your digital marketing goals.</p>\n\n<p>Would you be open to <strong>scheduling a brief call</strong> where I can detail our services?</p>\n\n<p>I remain at your disposal.</p>\n\n<p>Kind regards,</p>\n\n<p>Fulano Dominguez<br>Sales Director, SEO Consulting SL</p>', meta: { createdAt: new Date().toISOString() } }
];