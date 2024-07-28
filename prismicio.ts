import * as prismic from '@prismicio/client'

export const repositoryName = 'upiprabhu'

export const client = prismic.createClient(repositoryName, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
})