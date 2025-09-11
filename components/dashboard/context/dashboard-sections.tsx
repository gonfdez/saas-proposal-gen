import {
  CreditCard,
  DollarSign,
  Files,
  FileText,
  LayoutDashboard,
  Linkedin,
  Mail,
  MessageCircleQuestionMark,
  MessageSquareText,
  StickyNote,
  Twitter,
  UserCircle
} from 'lucide-react';
import React from 'react';

export enum DashboardSectionKey {
  OVERVIEW = "overview",
  SAVED_FILES = "savedFiles",
  PRICIND_AND_PLANS = "princingAndPlans",
  GET_HELP = "getHelp",
  MESSAGE_GENERATOR = "messageGenerator",
  PDF_GENERATOR = "pdfGenerator",
  LINKEDIN_POST_GENERATOR = "linkedinPostGenerator",
  REDDIT_POST_GENERATOR = "redditPostGenerator",
  TWITTER_POST_GENERATOR = "twitterPostGenerator",
  MAIL_GENERATOR = "mailGenerator",
  ACCOUNT = "account",
  BILLING = "billing"
}

export interface DashboardSection {
  sectionKey: DashboardSectionKey
  icon: React.ElementType
}

export const mainDashboardSections: DashboardSection[] = [
  {
    sectionKey: DashboardSectionKey.OVERVIEW,
    icon: LayoutDashboard
  },
  {
    sectionKey: DashboardSectionKey.SAVED_FILES,
    icon: Files
  },
  {
    sectionKey: DashboardSectionKey.PRICIND_AND_PLANS,
    icon: DollarSign
  },
]

export const secondaryDashboardSections: DashboardSection[] = [
  {
    sectionKey: DashboardSectionKey.GET_HELP,
    icon: MessageCircleQuestionMark
  },
]

export const toolDashboardSections: DashboardSection[] = [
  {
    sectionKey: DashboardSectionKey.MESSAGE_GENERATOR,
    icon: MessageSquareText
  },
  {
    sectionKey: DashboardSectionKey.MAIL_GENERATOR,
    icon: Mail
  },
  {
    sectionKey: DashboardSectionKey.PDF_GENERATOR,
    icon: FileText
  },
  {
    sectionKey: DashboardSectionKey.LINKEDIN_POST_GENERATOR,
    icon: Linkedin
  },
  {
    sectionKey: DashboardSectionKey.REDDIT_POST_GENERATOR,
    icon: StickyNote
  },
  {
    sectionKey: DashboardSectionKey.TWITTER_POST_GENERATOR,
    icon: Twitter
  },
]

export const userDashboardSections: DashboardSection[] = [
  {
    sectionKey: DashboardSectionKey.ACCOUNT,
    icon: UserCircle
  },
  {
    sectionKey: DashboardSectionKey.BILLING,
    icon: CreditCard
  },
]

