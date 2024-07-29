import { LoginForm } from '@/Components/LoginForm/LoginForm'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <section>
    <div>
    <h2>Sign in</h2>
    <h2>Hey there... Welcome back!</h2>
    <LoginForm/>
    <h4>New User? <Link href={`/sign-up`} className='text-blue-600'> sign up</Link></h4>

    </div>
    
  </section>
}

export default Page