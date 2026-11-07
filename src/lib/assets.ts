/** Files live in public/assets and are downloaded from Figma by `npm run assets`. */
export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
