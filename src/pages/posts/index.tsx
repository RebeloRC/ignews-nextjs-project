import Head from 'next/head' 
import Link from 'next/link'
import { GetStaticProps } from 'next'

import * as prismic from '@prismicio/client'
import { client } from '../../services/prismic'
import { RichText } from 'prismic-dom'

import style from './styles.module.scss'

type Post = {
  slug: string;
  title: string;
  excerpt: string;
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
          <Link key={post.slug} href={`/posts/${post.slug}`}>
          <a>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </a>
          </Link>
         )) }
        </div>
      </main>
    </>
  );

}

export const getStaticProps: GetStaticProps = async () => {


  const response = await client.query([
    prismic.predicate.at("document.type", "publication"),
   ], {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
    },
);


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