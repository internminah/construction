// TypeScript Interfaces for I Constructions Data Schema

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  foundedYear: number;
  address: string;
  email: string;
  phone: string;
  mapHref: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string;
  slug: string;
  iconName: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  location: string;
  year: number;
  image: string;
  category: string;
  client: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export interface AchievementItem {
  id: string;
  label: string;
  value: string;
  desc: string;
  iconName: string;
}

export interface ContactCard {
  id: string;
  title: string;
  detail: string;
  actionLabel: string;
  actionHref: string;
  iconName: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyChooseUsCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  iconBg: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  iconName: string;
}

// ==========================================
// Centralized Datasets
// ==========================================

export const companyInfo: CompanyInfo = {
  name: "I Constructions",
  tagline: "Building Excellence Since 2015",
  description: "We merge cutting-edge engineering with sophisticated architectural design to create structures that inspire.",
  detailedDescription: "At I Constructions, we build spaces that transcend utility to become works of art. Founded in 2015, we have established ourselves as one of the premier architectural design and general contracting firms. We manage full-lifecycle construction projects, delivering meticulous planning, breathtaking design, and masterful execution. Our multidisciplinary team of structural engineers, sustainability coordinators, interior designers, and veteran builders work in harmony to bring our client's grandest visions to life.",
  foundedYear: 2015,
  address: "102 Skyline Heights, Architecture Blvd, NY 10001",
  email: "info@iconstructions.com",
  phone: "+1 (555) 123-4567",
  mapHref: "https://www.google.com/maps/place/I+constructions/@15.8847063,78.1185717,6z",
};

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { platform: "Facebook", href: "https://facebook.com", iconName: "Facebook" },
  { platform: "Twitter", href: "https://twitter.com", iconName: "Twitter" },
  { platform: "Instagram", href: "https://instagram.com", iconName: "Instagram" },
  { platform: "LinkedIn", href: "https://linkedin.com", iconName: "Linkedin" },
];

export const services: ServiceItem[] = [
  {
    id: "serv-1",
    title: "Residential Construction",
    description: "Custom premium residences, modern apartments, and green living environments.",
    details: "Your dream home built with premium materials. We specialize in luxury residential estates, sustainable single-family residences, and upscale multi-family structures.",
    slug: "residential",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600",
  },
  {
    id: "serv-2",
    title: "Commercial Construction",
    description: "Building high-performance corporate offices, retail spaces, and commercial structures.",
    details: "We deliver commercial builds that optimize flow, support structural efficiency, and reflect modern luxury. Our services range from new build projects to tenant improvements.",
    slug: "commercial",
    iconName: "Building",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
  },
  {
    id: "serv-3",
    title: "Interior Design",
    description: "Elegant bespoke interior design concepts aligning utility and high-end aesthetics.",
    details: "Designing inside-out. We choose premium color configurations, load-bearing spatial layouts, and premium light systems to create breathtaking workspaces and living environments.",
    slug: "interior",
    iconName: "Award",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600",
  },
  {
    id: "serv-4",
    title: "Renovation & Remodeling",
    description: "Expanding, upgrading, and breathing new life into existing structural blueprints.",
    details: "We transform dated residences and commercial spaces into modern masterpieces. From single-room updates to full-facility structural modernizations.",
    slug: "renovation",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600",
  },
  {
    id: "serv-5",
    title: "Civil Engineering",
    description: "Infrastructure planning, load calculations, and environmental feasibility management.",
    details: "Bridging architectural vision with load safety. Our structural engineers design foundations, manage grading blueprints, and inspect load-bearing steel alignments.",
    slug: "engineering",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600",
  },
];

export const projects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "The Emerald Heights Skyscraper",
    description: "A 45-story commercial skyscraper featuring sustainable double-glazed panels and intelligent climate integration.",
    location: "Manhattan, NY",
    year: 2024,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    category: "Commercial",
    client: "Emerald Holdings Group",
  },
  {
    id: "proj-2",
    title: "Bespoke Glass Villa",
    description: "Luxury eco-residence constructed with local pine beams, structural concrete, and solar glass roofing.",
    location: "Hamptons, NY",
    year: 2023,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
    category: "Residential",
    client: "Sterling Family Trust",
  },
  {
    id: "proj-3",
    title: "Eco-Industrial Complex",
    description: "LEED Platinum certified factory building with integrated rainwater harvesting systems and passive cooling ventilation.",
    location: "Brooklyn, NY",
    year: 2025,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
    category: "Industrial",
    client: "Aura Logistics Ltd",
  },
];

export const reviews: ReviewItem[] = [
  {
    id: "rev-1",
    clientName: "Jonathan Sterling",
    role: "President, Sterling Family Trust",
    content: "I Constructions exceeded all our expectations. They finished the Hamptons Glass Villa three weeks ahead of schedule and the transparency in pricing was refreshing.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150",
  },
  {
    id: "rev-2",
    clientName: "Clara Vance",
    role: "Managing Director, Emerald Holdings Group",
    content: "The engineering team at I Constructions is top-tier. They integrated complex sustainable energy grids into our 45-story skyscraper with precision.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Marcus Sterling",
    role: "Founder & Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
    bio: "With over 20 years in real estate development and civil engineering, Marcus steers the strategic growth of I Constructions.",
    socials: { linkedin: "#", twitter: "#", email: "marcus@iconstructions.com" },
  },
  {
    id: "team-2",
    name: "Dr. Alaina Vance",
    role: "Director of Structural Engineering",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
    bio: "A pioneer in sustainable concrete architectures, Alaina oversees structural analysis and complex load mechanics.",
    socials: { linkedin: "#", twitter: "#", email: "alaina@iconstructions.com" },
  },
  {
    id: "team-3",
    name: "David Kross",
    role: "Principal Architect",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
    bio: "David is the creative force behind our structures, fusing modernist aesthetics with eco-friendly smart layouts.",
    socials: { linkedin: "#", twitter: "#", email: "david@iconstructions.com" },
  },
  {
    id: "team-4",
    name: "Sarah Jenkins",
    role: "Lead Project Administrator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
    bio: "Sarah ensures optimal procurement schedules and project timeline tracking, leading cross-functional builder networks.",
    socials: { linkedin: "#", twitter: "#", email: "sarah@iconstructions.com" },
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "ach-1",
    label: "Projects Completed",
    value: "500+",
    iconName: "Trophy",
    desc: "Residential, commercial, and engineering layout commissions.",
  },
  {
    id: "ach-2",
    label: "Years Experience",
    value: "10+",
    iconName: "Clock",
    desc: "Delivering architectural elegance and master contracting.",
  },
  {
    id: "ach-3",
    label: "Happy Clients",
    value: "1,000+",
    iconName: "Heart",
    desc: "End-to-end partnerships built on mutual alignment and trust.",
  },
  {
    id: "ach-4",
    label: "Satisfaction Rate",
    value: "98%",
    iconName: "Activity",
    desc: "Post-occupancy validation and service quality ratings.",
  },
];

export const contactInfo: ContactCard[] = [
  {
    id: "cont-1",
    title: "Headquarters Office",
    detail: "102 Skyline Heights, Architecture Blvd, NY 10001",
    actionLabel: "Get Directions",
    actionHref: "https://www.google.com/maps/place/I+constructions/@15.8847063,78.1185717,6z",
    iconName: "MapPin",
  },
  {
    id: "cont-2",
    title: "Email Queries",
    detail: "info@iconstructions.com",
    actionLabel: "Send Email",
    actionHref: "mailto:info@iconstructions.com",
    iconName: "Mail",
  },
  {
    id: "cont-3",
    title: "Phone Support",
    detail: "+1 (555) 123-4567",
    actionLabel: "Call Now",
    actionHref: "tel:+15551234567",
    iconName: "PhoneCall",
  },
];

export const milestones: Milestone[] = [
  {
    id: "mile-1",
    year: "2015",
    title: "Company Founded",
    description: "I Constructions was established with a core team of three engineers and a vision to redefine high-end residential architectural design in New York.",
    iconName: "Building",
  },
  {
    id: "mile-2",
    year: "2018",
    title: "100 Projects Completed",
    description: "Successfully delivered our 100th project milestone, expanding our scope to include high-rise office spaces and corporate construction complexes.",
    iconName: "Briefcase",
  },
  {
    id: "mile-3",
    year: "2021",
    title: "Expanded Operations",
    description: "Inaugurated our second regional office and scaled our engineering department, incorporating sustainable green-building certifications (LEED).",
    iconName: "Globe",
  },
  {
    id: "mile-4",
    year: "2025",
    title: "500+ Happy Clients",
    description: "Reached our milestone of serving over 500 happy clients, establishing a reputation for premium craftsmanship and on-time structural deliveries.",
    iconName: "Users",
  },
];

export const whyChooseUs: WhyChooseUsCard[] = [
  {
    id: "wcu-1",
    title: "Quality Materials",
    description: "We partner with top global manufacturers to source premium structural steel, concrete, sustainable insulation, and finishes that withstand the test of time.",
    iconName: "HardHat",
    color: "from-emerald-500/20 to-primary/10",
    iconBg: "bg-primary text-mint",
  },
  {
    id: "wcu-2",
    title: "Experienced Team",
    description: "Our roster comprises certified architects, LEED coordinators, master builders, and veteran project engineers with over 150 years of combined experience.",
    iconName: "Compass",
    color: "from-teal-500/20 to-accent/10",
    iconBg: "bg-accent text-mint",
  },
  {
    id: "wcu-3",
    title: "On-Time Delivery",
    description: "Through advanced BIM software and critical path project scheduling, we guarantee prompt delivery of all residential and commercial building layouts.",
    iconName: "Clock",
    color: "from-emerald-500/20 to-primary/10",
    iconBg: "bg-primary text-mint",
  },
  {
    id: "wcu-4",
    title: "Customer Satisfaction",
    description: "We practice client-centric construction, maintaining a transparent communication pipeline, providing 3D progress visualizers and post-handover support.",
    iconName: "HeartHandshake",
    color: "from-teal-500/20 to-accent/10",
    iconBg: "bg-accent text-mint",
  },
];

export const dashboardStats: DashboardStat[] = [
  {
    id: "db-1",
    label: "Total Inquiries",
    value: "148",
    change: "+12.5%",
    isPositive: true,
    iconName: "Mail",
  },
  {
    id: "db-2",
    label: "Active Projects",
    value: "12",
    change: "+2",
    isPositive: true,
    iconName: "Building2",
  },
  {
    id: "db-3",
    label: "Client Rating",
    value: "4.9/5",
    change: "+0.1",
    isPositive: true,
    iconName: "Award",
  },
];

// ==========================================
// Simulated Asynchronous API Endpoints
// ==========================================

export async function getCompanyInfo(): Promise<CompanyInfo> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/settings`, {
      next: { revalidate: 0 } // Disable Next.js caching to ensure updates reflect immediately
    });
    if (!res.ok) throw new Error("API response not ok");
    const data = await res.json();
    if (data.success && data.data) {
      return {
        name: data.data.name,
        tagline: data.data.tagline,
        description: data.data.description,
        detailedDescription: data.data.detailed_description || data.data.detailedDescription,
        foundedYear: Number(data.data.founded_year || data.data.foundedYear),
        address: data.data.address,
        email: data.data.email,
        phone: data.data.phone,
        mapHref: data.data.map_href || data.data.mapHref,
      };
    }
  } catch (error) {
    console.error("Failed to fetch company info, using static backup:", error);
  }
  return companyInfo;
}

export async function getNavLinks(): Promise<NavLink[]> {
  return new Promise((resolve) => setTimeout(() => resolve(navLinks), 50));
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return new Promise((resolve) => setTimeout(() => resolve(socialLinks), 50));
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
    if (!res.ok) throw new Error("API response not ok");
    const data = await res.json();
    const result = Array.isArray(data.data) ? data.data : (data.data?.services || data.services);
    if (Array.isArray(result)) {
      return result.map((s: any) => {
        const title = s.title || s.name || '';
        let iconName = 'Building2';
        if (title.toLowerCase().includes('residential')) iconName = 'Building2';
        else if (title.toLowerCase().includes('commercial')) iconName = 'Building';
        else if (title.toLowerCase().includes('interior')) iconName = 'Award';
        else if (title.toLowerCase().includes('renovation')) iconName = 'Hammer';
        else if (title.toLowerCase().includes('engineering')) iconName = 'Compass';
        else if (title.toLowerCase().includes('management')) iconName = 'Briefcase';

        return {
          id: s.id?.toString() || '',
          title,
          description: s.description || '',
          details: s.description || '',
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          iconName,
          image: s.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600'
        };
      });
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Failed to fetch services, using static backup:", error);
    return services;
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
    if (!res.ok) throw new Error("API response not ok");
    const data = await res.json();
    const result = Array.isArray(data.data) ? data.data : (data.data?.projects || data.projects);
    if (Array.isArray(result)) {
      return result.map((p: any) => ({
        id: p.id?.toString() || '',
        title: p.project_name || p.title || '',
        description: p.description || '',
        location: p.location || 'New York, NY',
        year: p.year || 2026,
        image: p.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800',
        category: p.category || 'Commercial',
        client: p.client || 'I Constructions Client'
      }));
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Failed to fetch projects, using static backup:", error);
    return projects;
  }
}

export async function getReviews(): Promise<ReviewItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);
    if (!res.ok) throw new Error("API response not ok");
    const data = await res.json();
    const result = Array.isArray(data.data) ? data.data : (data.data?.testimonials || data.testimonials);
    if (Array.isArray(result)) {
      return result.map((r: any) => ({
        id: r.id?.toString() || '',
        clientName: r.customer_name || r.clientName || '',
        role: r.role || 'Client',
        content: r.review || r.content || '',
        rating: Number(r.rating) || 5,
        image: r.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'
      }));
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Failed to fetch reviews, using static backup:", error);
    return reviews;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return new Promise((resolve) => setTimeout(() => resolve(teamMembers), 50));
}

export async function getAchievements(): Promise<AchievementItem[]> {
  return new Promise((resolve) => setTimeout(() => resolve(achievements), 50));
}

export async function getContactInfo(): Promise<ContactCard[]> {
  return new Promise((resolve) => setTimeout(() => resolve(contactInfo), 50));
}

export async function getMilestones(): Promise<Milestone[]> {
  return new Promise((resolve) => setTimeout(() => resolve(milestones), 50));
}

export async function getWhyChooseUs(): Promise<WhyChooseUsCard[]> {
  return new Promise((resolve) => setTimeout(() => resolve(whyChooseUs), 50));
}

export async function getDashboardStats(): Promise<DashboardStat[]> {
  try {
    const [contactsRes, projectsRes, reviewsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`),
    ]);

    const contacts = await contactsRes.json().catch(() => ({}));
    const projects = await projectsRes.json().catch(() => ({}));
    const reviews = await reviewsRes.json().catch(() => ({}));

    // Contacts/Inquiries data helper:
    const contactsData = Array.isArray(contacts.data) 
      ? contacts.data 
      : (contacts.data?.inquiries || contacts.inquiries || null);
    const contactsCount = contactsData ? contactsData.length : 8;

    // Projects data helper:
    const projectsData = Array.isArray(projects.data) 
      ? projects.data 
      : (projects.data?.projects || projects.projects || null);
    const projectsCount = projectsData ? projectsData.length : projects.length;

    // Reviews data helper:
    const reviewsData = Array.isArray(reviews.data) 
      ? reviews.data 
      : (reviews.data?.testimonials || reviews.testimonials || null);
    const reviewsCount = reviewsData ? reviewsData.length : reviews.length;

    return [
      {
        id: "db-1",
        label: "Total Enquiries",
        value: `${contactsCount}`,
        change: "",
        isPositive: true,
        iconName: "Mail",
      },
      {
        id: "db-2",
        label: "Total Projects",
        value: `${projectsCount}`,
        change: "",
        isPositive: true,
        iconName: "Building2",
      },
      {
        id: "db-3",
        label: "Total Reviews",
        value: `${reviewsCount}`,
        change: "",
        isPositive: true,
        iconName: "Award",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch dashboard stats, using static backup:", error);
    return [
      {
        id: "db-1",
        label: "Total Enquiries",
        value: "8",
        change: "",
        isPositive: true,
        iconName: "Mail",
      },
      {
        id: "db-2",
        label: "Total Projects",
        value: `${projects.length}`,
        change: "",
        isPositive: true,
        iconName: "Building2",
      },
      {
        id: "db-3",
        label: "Total Reviews",
        value: `${reviews.length}`,
        change: "",
        isPositive: true,
        iconName: "Award",
      },
    ];
  }
}

export const processTimeline: ProcessStep[] = [
  {
    id: "step-1",
    step: "01",
    title: "Initial Consultation",
    description: "We align on your design vision, budget allocations, structural scope, and local feasibility criteria.",
    iconName: "Target",
  },
  {
    id: "step-2",
    step: "02",
    title: "Design & Planning",
    description: "Our principal architect draft schematics, 3D BIM walkthroughs, and material lists for your approval.",
    iconName: "Compass",
  },
  {
    id: "step-3",
    step: "03",
    title: "Construction Phase",
    description: "Master builders execute structural works under strict project coordination and safety parameters.",
    iconName: "HardHat",
  },
  {
    id: "step-4",
    step: "04",
    title: "Quality Inspection & Handover",
    description: "Meticulous quality audits, environmental certifications, and key handovers for your new premium space.",
    iconName: "Trophy",
  },
];

export async function getProcessTimeline(): Promise<ProcessStep[]> {
  return new Promise((resolve) => setTimeout(() => resolve(processTimeline), 50));
}
