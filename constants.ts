import { ExperienceItem, SkillCategory, EducationItem, CertificationItem } from './types';

export const RESUME_LINK = "/resume.html"; 

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/saurabhbusinessanalyst",
  github: "https://github.com/Saurabhchhiller",
  email: "schhiller1@gmail.com",
  phone: "657-234-6023"
};

export const SUMMARY = `I help organizations turn complex business processes into simple, scalable, and user-friendly digital solutions. I’m the BA/PO who turns ambiguity into clear, compliant, user-friendly systems—aligning stakeholders, shaping API/UX workflows, and delivering measurable results across enterprise systems. I’m a Certified Product Owner and Senior Business Analyst with 9+ years of experience implementing enterprise systems across healthcare, pharma, university, and government environments.`;

export const SKILLS: SkillCategory[] = [
  {
    title: "Product & Business",
    skills: ["Product Ownership", "Agile Scrum", "Stakeholder Management", "Requirement Elicitation", "User Stories", "Gap Analysis", "Business Process Modeling", "Roadmap Planning"]
  },
  {
    title: "Technical & Data",
    skills: ["Workflow Automation", "API Integration (REST/SOAP)", "SQL", "Tableau", "Power BI", "Data Modeling", "ETL Processes", "JSON/XML"]
  },
  {
    title: "Compliance & Industry",
    skills: ["Healthcare & Pharma", "HIPAA Compliance", "FDA Regulations", "GxP Standards", "21 CFR Part 11", "Risk Assessment"]
  },
  {
    title: "Tools",
    skills: ["JIRA", "Confluence", "Rally", "Visio", "PostgreSQL", "Oracle", "MS SQL Server"]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "stanford",
    role: "Product Manager / Sr. Business Analyst",
    company: "Stanford University",
    period: "January 2025 - Present",
    location: "Redwood City, California",
    description: "Leading enhancements for the Stanford electronic Research Administration System (SeRA), an enterprise-wide system supporting research administration.",
    achievements: [
      "Designed intuitive SeRA interfaces, optimizing usability and functionality for diverse stakeholders.",
      "Implemented Agile Scrum methodologies to manage SeRA lifecycles, ensuring iterative delivery.",
      "Solved complex challenges through data analysis and logical problem-solving approaches.",
      "Collaborated with technical teams to integrate database-driven solutions seamlessly.",
      "Facilitated workshops with stakeholders, driving consensus on system improvements."
    ]
  },
  {
    id: "qualapps",
    role: "Senior Business Analyst",
    company: "QualApps, Inc.",
    period: "December 2022 - December 2024",
    location: "Sacramento, California",
    description: "Replaced legacy applications with a secured, modern user-friendly custom application (IMPEI) for ARB.",
    achievements: [
      "Skillfully gathered and validated business requirements through interviews and workshops.",
      "Employed advanced data analysis to uncover key insights informing decision-making.",
      "Created detailed process maps to illustrate current and future states.",
      "Collaborated closely with cross-functional teams as a bridge between business units and IT.",
      "Developed comprehensive use cases to clarify functionalities."
    ]
  },
  {
    id: "d2",
    role: "Product Manager / Sr. Business System Analyst",
    company: "D2 Solutions",
    period: "April 2021 - November 2022",
    location: "California",
    description: "Led end-to-end product analysis and delivery for the UltraTouch® platform supporting patient enrollment and workflow automation.",
    achievements: [
      "Spearheaded creation of a new dashboard to display real-time patient outreach tasks.",
      "Integrated Patient Management Tool with a GraphQL API Gateway to unify patient data.",
      "Designed HIPAA-compliant digital onboarding via branded short URLs.",
      "Built time-sensitive call scheduling features improving callback success rates.",
      "Managed Jira backlog, authored epics, and led sprint planning."
    ]
  },
  {
    id: "sdlc",
    role: "Sr. Consultant BA / Product Owner",
    company: "SDLC Partners, L.P.",
    period: "December 2020 - April 2021",
    location: "",
    description: "Decomposed legacy Monolith application into Micro-products for scalability and cost-effectiveness.",
    achievements: [
      "Undertook technical business analysis to design REST API endpoints.",
      "Acted as Product Owner in analysis and design of client implementations.",
      "Identified interface data scope, validation criteria, and mapping criteria.",
      "Analyzed REST & SOAP services and documented data protocols."
    ]
  },
  {
    id: "caremetx",
    role: "Sr. Business Analyst",
    company: "CareMetx, LLC",
    period: "September 2019 - December 2020",
    location: "Oakland, CA",
    description: "Supported BioMarin’s first-ever gene therapy launch (Roctavian) by creating HIPAA-compliant workflows.",
    achievements: [
      "Owned end-to-end requirements analysis and stakeholder alignment.",
      "Designed new intake workflows and secured Change Control Board approvals.",
      "Streamlined patient access workflows, improving eligibility verification accuracy by 20%.",
      "Delivered system enhancements for RareConnections therapies, reducing turnaround times."
    ]
  },
  {
    id: "cvs",
    role: "Lead Consultant (Business Analyst)",
    company: "CVS Health",
    period: "November 2018 - March 2019",
    location: "",
    description: "Provided new business and projection reports based on user roles and designations.",
    achievements: [
      "Partnered with business stakeholders to gather requirements under Agile Methodology.",
      "Developed and presented custom reporting solutions through Tableau.",
      "Performed source system data validation and impact analysis using SQL.",
      "Created Functional Design Documents for Data Warehouse team."
    ]
  },
  {
    id: "moodys",
    role: "Technical Product Analyst",
    company: "Moody's Analytics",
    period: "May 2018 - November 2018",
    location: "San Francisco, CA",
    description: "Enhanced the 'Credit Lens' application to fulfill client requirements.",
    achievements: [
      "Led backlog-grooming sessions to estimate user stories.",
      "Created BPMN workflow diagrams in Camunda.",
      "Created Data mapping documents for integration with Finastra.",
      "Gathered data information using analytical techniques for visualization."
    ]
  },
  {
    id: "wellsfargo",
    role: "System Analyst",
    company: "Wells Fargo",
    period: "August 2016 - May 2018",
    location: "San Antonio, Texas",
    description: "Converted existing HP ALM Quality Center schemas to a new template schema.",
    achievements: [
      "Elicited system requirements using interviews and document analysis.",
      "Performed data analysis and mapping for schema conversion.",
      "Increased Client Satisfaction by 20% through defect resolution.",
      "Used MySQL functions to extract data and create mapping documents."
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor's degree in Mechanical Engineering",
    institution: "SRM Institute of Engineering & Technology",
    year: "2007 - 2011"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  { name: "Certified Scrum Product Owner (CSPO®)" },
  { name: "Certified ScrumMaster® (CSM)" },
  { name: "Professional Scrum Master I (PSM I)" },
  { name: "Generative AI for Product Managers" }
];