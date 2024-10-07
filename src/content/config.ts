import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        primaryImage: image().optional(),
        primaryImageAlt: z.string().optional(),
        createdAt: z.date(),
        type:  z.enum(['voyage', 'note'])
    })
})

export const collections = {
    posts: postCollection
}
