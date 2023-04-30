'use client'

import { useRouter } from 'next/navigation';
import { IUser } from '../models/user';

interface Props {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {
    const router = useRouter();
    const session: IUser = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
  
    if (!session.token) {
      router.push('/auth/signin');
      return <div></div>;
    }

    return <div>{children}</div>
}