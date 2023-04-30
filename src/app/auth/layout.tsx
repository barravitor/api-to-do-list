'use client'

import { useRouter } from 'next/navigation';
import { IUser } from '../../models/user';

function Provider({ children }: { children: React.ReactNode}) {
  const router = useRouter();
  let user: IUser = {};
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
  }

  if (user.token) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return <div></div>;
  }

  return <div>{children}</div>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
