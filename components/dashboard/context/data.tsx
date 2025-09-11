import { DollarSign, Files, FileText, LayoutDashboard, Linkedin, Mail, MessageCircleQuestionMark, MessageSquareText, StickyNote } from 'lucide-react';

export const dashboardData = {
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Saved Files",
      url: "#",
      icon: Files,
    },
    {
      title: "Pricing and Plans",
      url: "#",
      icon: DollarSign
    }
  ],
  navSecondary: [
    {
      title: "Get help",
      url: "#",
      icon: MessageCircleQuestionMark,
    }
  ],
  tools: [
    {
      name: "Message Generator",
      url: "#",
      icon: MessageSquareText,
    },
    {
      name: "PDF Generator",
      url: "#",
      icon: FileText,
    },
    {
      name: "LinkedIn Post Generator",
      url: "#",
      icon: Linkedin,
    },
    {
      name: "Reddit Post Generator",
      url: "#",
      icon: StickyNote,
    },
    {
      name: "Mail Generator",
      url: "#",
      icon: Mail,
    },
  ],
}

export type DashboardData = typeof dashboardData;

