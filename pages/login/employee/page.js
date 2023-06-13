import React from 'react'
import checkAuthentication from '@/components/HOC/WithAuth'
 function Main() {
  return (
    <div>
        Employee
    </div>
  )
}
export default checkAuthentication (Main);