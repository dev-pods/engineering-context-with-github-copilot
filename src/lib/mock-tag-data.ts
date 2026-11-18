export const PHOTO_TAGS = {
  SUBJECT: ["landscape", "portrait", "architecture", "nature", "wildlife", "street", "travel"],
  EVENT: ["wedding", "professional"],
  STYLE: ["studio", "macro", "editorial"],
  LOCATION: ["city", "building", "outdoor"],
} as const;

export const AVAILABLE_TAGS = Object.values(PHOTO_TAGS).flat().sort();
