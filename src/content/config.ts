import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
    type: "content",
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        primaryImage: image(),
        primaryImageAlt: z.string(),
        createdAt: z.date(),
        type:  z.enum(['voyage', 'note'])
    })
})

export const collections = {
    posts: postCollection
}
