import styles from './styles.module.scss'

interface SubscribeButtonProps{
  priceId: String;
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
  return(
    <button className={styles.subscribeButton} type="button">
      Subscribe now  
    </button>
  )
}