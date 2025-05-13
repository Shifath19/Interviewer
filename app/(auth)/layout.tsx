import React, { ReactNode } from 'react'
import { toast } from 'sonner'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
      <div className='auth-layout'>{children}</div>
      
  
  )
}

export default AuthLayout