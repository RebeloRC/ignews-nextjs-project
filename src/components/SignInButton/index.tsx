import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/react'

import styles from './styles.module.scss'

export function SignInButton(){
    const { data: session } = useSession()

    console.log(session)

  return session ? (
    <button className={styles.signInButton} type="button" onClick={() => signOut()}>
    <FaGithub color="#04D361" />
    {session.user.name}
    <FiX color="#737380" className={styles.closeIcon} />
  </button>
  ) : (
    <button className={styles.signInButton} type="button" onClick={() => signIn('github')}>
    <FaGithub color="#EBA417" />
    Sing in With GitHub
  </button>
  )
}