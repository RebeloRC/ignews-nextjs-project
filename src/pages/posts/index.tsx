import Head from 'next/head' 

import { client } from '../../services/prismic'
import { RichText } from 'prismic-dom'

import style from './styles.module.scss'


export type DataDocumentsPrismic = {
  title?: string,
  content?: Array<{
      type: string,
      text: string
  }>,
}

type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string;
};

interface PostsProps {
  posts: Post[]
}

export default function posts({ posts }: PostsProps) {
  return(
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={style.container}>
        <div className={style.posts}>
          { posts.map(post => (
          <a key={post.slug} href='#'>
            <time>{post.updatedAt}12 de março de 2021</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </a>
         )) }
        </div>
      </main>
    </>
  );

}

export const getStaticProps = async () => {
  const response = await client.getAllByType
  
  ('publication', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    fetch: ['publication.title', 'publication'],
    pageSize: 100,
    lang: 'pt-BR',
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  return {
    props: {
      posts
    },
  }

}


/*
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    prismic.predicates.at("document.type", "page"),
  ], {
    fetch: ['publication.title', 'publication'],
    pageSize: 100,
  });

  console.log(response)

  return {
    props: {}
  }
}
*/