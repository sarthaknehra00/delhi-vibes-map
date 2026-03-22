import { AreaId } from "./areas";

export interface BrutalTruth {
  id: string;
  areaId: AreaId;
  content: string;
  votes: number;
  createdAt: string;
  reported: boolean;
}

export const MOCK_BRUTAL_TRUTHS: BrutalTruth[] = [
  { id: "bt1", areaId: "cp", content: "Everyone meets here, no one knows why 🤡", votes: 15, createdAt: "2026-03-22", reported: false },
  { id: "bt2", areaId: "hauz-khas", content: "Philosophy + daaru = HKV nights", votes: 10, createdAt: "2026-03-22", reported: false },
  { id: "bt3", areaId: "chandni-chowk", content: "If you find parking, you’re a god 🚗", votes: 20, createdAt: "2026-03-22", reported: false },
  { id: "bt4", areaId: "gurgaon", content: "Salary gone in 2 hours 🍻", votes: 12, createdAt: "2026-03-22", reported: false },
  { id: "bt5", areaId: "noida", content: "Everything available, nothing special", votes: 8, createdAt: "2026-03-22", reported: false },
  { id: "bt6", areaId: "saket", content: "Dates funded by parents 💳", votes: 7, createdAt: "2026-03-22", reported: false },
  { id: "bt7", areaId: "defence-colony", content: "Food good, wallet destroyed 💸", votes: 11, createdAt: "2026-03-22", reported: false },
  { id: "bt8", areaId: "laxmi-nagar", content: "Budget tight, dreams unlimited 💀", votes: 9, createdAt: "2026-03-22", reported: false },
  { id: "bt9", areaId: "preet-vihar", content: "Looks simple, money hidden 💰", votes: 6, createdAt: "2026-03-22", reported: false },
  { id: "bt10", areaId: "shahdara", content: "Traffic + taste both heavy 🚦🍲", votes: 14, createdAt: "2026-03-22", reported: false },
  { id: "bt11", areaId: "krishna-nagar", content: "Shopping chaos champion 🛍️", votes: 13, createdAt: "2026-03-22", reported: false },
  { id: "bt12", areaId: "rajiv-chowk", content: "If you survive here, you survive anywhere 💀", votes: 18, createdAt: "2026-03-22", reported: false },
  { id: "bt13", areaId: "sector-29-gurgaon", content: "Weekend = survival test", votes: 16, createdAt: "2026-03-22", reported: false },
  { id: "bt14", areaId: "golf-course-road", content: "Luxury but no soul 🏢", votes: 5, createdAt: "2026-03-22", reported: false },
  { id: "bt15", areaId: "noida-sector-62", content: "Dreams died in cubicles 🧠", votes: 4, createdAt: "2026-03-22", reported: false },
  { id: "bt16", areaId: "greater-noida", content: "Future city… still waiting ⏳", votes: 3, createdAt: "2026-03-22", reported: false },
  { id: "bt17", areaId: "kamla-nagar", content: "Street shopping Olympics 🛍️", votes: 17, createdAt: "2026-03-22", reported: false },
  { id: "bt18", areaId: "gtb-nagar", content: "Notes > life", votes: 19, createdAt: "2026-03-22", reported: false },
  { id: "bt19", areaId: "jama-masjid", content: "Crowd = infinity", votes: 22, createdAt: "2026-03-22", reported: false },
  { id: "bt20", areaId: "punjabi-bagh", content: "Flex culture strong 💪", votes: 21, createdAt: "2026-03-22", reported: false },
];