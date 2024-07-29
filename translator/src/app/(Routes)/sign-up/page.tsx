import RegisterForm from '@/Components/RegisterForm/RegisterForm'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <>
  <section>
    <div>
    <h2> Create New Account ...</h2>
  <RegisterForm/>
  <h4> Already have an account? <Link href={`/sign-in`} className='text-blue-600'> sign in</Link></h4>

    </div>
  </section>
  </>
}

export default Page