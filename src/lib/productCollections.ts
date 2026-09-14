export const PRODUCT_COLLECTION_OPTIONS = [
  { value: 'lawn-mowers', label: 'Lawn Mowers' },
  { value: 'pressure-washers', label: 'Pressure Washers' },
  { value: 'outdoor-power-equipment', label: 'Outdoor Power Equipment' },
] as const;

export function getCollectionsForCategory(category: string): string[] {
  const normalized = category.toLowerCase().trim();

  if (/mower|tractor|zero turn|riding|walk-behind|push/.test(normalized)) {
    return ['lawn-mowers'];
  }

  if (/pressure washer|power washer/.test(normalized)) {
    return ['pressure-washers'];
  }

  if (/chainsaw|blower|trimmer|generator|log splitter|edger|cultivator|power|equipment|tool/.test(normalized)) {
    return ['outdoor-power-equipment'];
  }

  return ['outdoor-power-equipment'];
}
