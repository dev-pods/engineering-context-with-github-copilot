export const PHOTO_TAGS = {
  SUBJECT: ["landscape", "portrait", "architecture", "nature", "wildlife", "street"],
  EVENT: ["wedding", "professional"],
  STYLE: ["studio", "macro"],
  LOCATION: ["city", "building"],
} as const;

export const AVAILABLE_TAGS = Object.values(PHOTO_TAGS).flat().sort();
