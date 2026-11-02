import meta from './photo-meta.json';

export type PhotoName = keyof typeof meta;

/** Props for a next/image that fills its frame: local, pre-graded photo with its blur placeholder. */
export function photo(name: PhotoName) {
  return { src: `/images/photos/${name}.jpg`, blurDataURL: meta[name].blur, placeholder: 'blur' as const };
}
