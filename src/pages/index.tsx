import Head from 'next/head'
import { GetServerSideProps } from 'next' 

import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps ) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get acess to all the publications <br />
          <span>For {product.amount} month</span></p>
          
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1L1IuHFvw7ONThzsihA9JxSS')

 const product = {
   priceId: price.id,
   amount: new Intl.NumberFormat('en-US',{
     style: 'currency',
     currency: 'USD',
   }).format(price.unit_amount / 100),
 }
  
  return {
    props: {
      product,
    }
  }
}

