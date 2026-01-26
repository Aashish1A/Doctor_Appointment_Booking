import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import heroDoctorBg from "./heroDoctorBG.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  heroDoctorBg,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General physician",
    degree: "MD, Internal Medicine",
    experience: "4 Years",
    about:
      "Dr. Richard James emphasizes preventative care and chronic disease management, tailoring treatment plans that blend lifestyle guidance with evidence-based medicine.",
    fees: 50,
    address: {
      line1: "12 Kingfisher Avenue",
      line2: "Southwark, London SE1",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MD, Obstetrics & Gynecology",
    experience: "3 Years",
    about:
      "Dr. Emily Larson provides compassionate prenatal and postnatal support, combining modern obstetric care with patient education for confident family planning.",
    fees: 60,
    address: {
      line1: "45 Willowbank Gardens",
      line2: "Chelsea, London SW3",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MD, Dermatology",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel specializes in personalized skincare regimens, offering advanced therapies for acne, eczema, and cosmetic dermatology concerns.",
    fees: 30,
    address: {
      line1: "88 Rosehill Crescent",
      line2: "Hampstead, London NW3",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MD, Pediatrics",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee supports families with holistic pediatric care, focusing on developmental milestones, nutrition, and preventive vaccinations.",
    fees: 40,
    address: {
      line1: "3 Brookfield Lane",
      line2: "Islington, London N1",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "DM, Neurology",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia manages complex neurological disorders with precision diagnostics and long-term rehabilitation strategies for improved quality of life.",
    fees: 50,
    address: {
      line1: "101 Riverview Terrace",
      line2: "Canary Wharf, London E14",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Neurologist",
    degree: "MD, Neurology",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams focuses on headache medicine and movement disorders, blending medication management with lifestyle coaching.",
    fees: 50,
    address: {
      line1: "54 Meridian Court",
      line2: "Greenwich, London SE10",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Christopher Davis",
    image: doc7,
    speciality: "General physician",
    degree: "MD, Family Medicine",
    experience: "4 Years",
    about:
      "Dr. Christopher Davis partners with patients to manage hypertension, diabetes, and routine wellness through collaborative care plans.",
    fees: 50,
    address: {
      line1: "29 Cedar Grove",
      line2: "Wimbledon, London SW19",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "DGO, Gynecology",
    experience: "3 Years",
    about:
      "Dr. Timothy White advocates for minimally invasive gynecologic procedures and individualized fertility counseling.",
    fees: 60,
    address: {
      line1: "7 Lavender Wharf",
      line2: "Battersea, London SW11",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MD, Clinical Dermatology",
    experience: "1 Years",
    about:
      "Dr. Ava Mitchell combines dermoscopy with cutting-edge treatments to manage pigmentation disorders and sensitive skin conditions.",
    fees: 30,
    address: {
      line1: "63 Heatherfield Close",
      line2: "Richmond, London TW9",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MD, Pediatric Medicine",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King supports child wellness through preventive screenings, asthma management, and family-centered health education.",
    fees: 40,
    address: {
      line1: "18 Orchard Street",
      line2: "Clapham, London SW4",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Neurologist",
    degree: "DM, Clinical Neurology",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly delivers multidisciplinary care for epilepsy and neurodegenerative illnesses, integrating diagnostics with occupational therapy.",
    fees: 50,
    address: {
      line1: "210 Pinehurst Way",
      line2: "Bloomsbury, London WC1",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Neurologist",
    degree: "Fellowship, Neurocritical Care",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris coordinates acute neurocritical interventions and long-term stroke rehabilitation with a patient-first approach.",
    fees: 50,
    address: {
      line1: "9 Lantern Mews",
      line2: "Shoreditch, London E2",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General physician",
    degree: "MD, General Medicine",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans delivers comprehensive adult care with a focus on preventive screenings and collaborative chronic disease management.",
    fees: 50,
    address: {
      line1: "66 Maple Parade",
      line2: "Ealing, London W5",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MS, Gynecologic Surgery",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez excels in advanced laparoscopic procedures and women’s health screenings tailored to each stage of life.",
    fees: 60,
    address: {
      line1: "140 Crescent View",
      line2: "Notting Hill, London W11",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MD, Cosmetic Dermatology",
    experience: "1 Years",
    about:
      "Dr. Amelia Hill offers evidence-driven cosmetic dermatology solutions, emphasizing safe aesthetic enhancements and skin rejuvenation.",
    fees: 30,
    address: {
      line1: "23 Larkspur Court",
      line2: "Kensington, London W8",
    },
  },
];
