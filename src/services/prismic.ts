import * as prismic from '@prismicio/client'
import fetch from 'node-fetch'

const endpoint = process.env.PRISMIC_ENDPOINT
export const client = prismic.createClient(endpoint,  {accessToken: process.env.PRISMIC_ACCESS_TOKEN, fetch })