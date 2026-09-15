import type { Review } from '@/types/product';

const genericAuthorPattern = /^(verified\s+(customer|buyer|purchase)|customer|anonymous)$/i;

const customerDisplayNames = [
  'Michael R.',
  'Sarah L.',
  'David H.',
  'Amanda C.',
  'Robert M.',
  'Jennifer K.',
  'Thomas B.',
  'Lisa W.',
  'Kevin P.',
  'Emily S.',
  'Brian T.',
  'Rachel G.',
];

function getStableNameIndex(seed: string) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % customerDisplayNames.length;
}

export function getReviewDisplayAuthor(review: Pick<Review, 'id' | 'author'>, index = 0) {
  const author = typeof review.author === 'string' ? review.author.trim() : '';

  if (author && !genericAuthorPattern.test(author)) {
    return author;
  }

  return customerDisplayNames[getStableNameIndex(`${review.id || 'review'}-${index}`)];
}
