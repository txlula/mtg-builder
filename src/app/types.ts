import { z } from "zod/v4";

export const CardDataSchema = z.object({
    name: z.string(),
    manaCost: z.string(),
    cmc: z.number(),
    colors: z.array(z.string()),
    colorIdentity: z.array(z.string()),
    type: z.string(),
    supertypes: z.array(z.string()),
    types: z.array(z.string()),
    subtypes: z.array(z.string()),
    rarity: z.string(),
    set: z.string(),
    setName: z.string(),
    text: z.string(),
    power: z.string(),
    toughness: z.string(),
    imageUrl: z.string()
}).catchall(z.any())


export type CardData = z.Infer<typeof CardDataSchema>

export const CardImageDataSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    cmc: z.number(),
    text: z.string(),
})

export type CardImageData = z.Infer<typeof CardImageDataSchema>