'use client'

import { useRouter } from 'next/navigation';
import { IUser } from '../models/user';

interface Props {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {
    const router = useRouter();
    let user: IUser = {};
    if (typeof window !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
    }
  
    if (!user.token) {
      if (typeof window !== 'undefined') {
        router.push('/auth/signin');
      }
      return <div></div>;
    }

    return <div>{children}</div>
}