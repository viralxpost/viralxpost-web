import clsx from "clsx"
import React from "react"


const Container = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <div className={clsx("max-w-[120rem] mx-auto px-7", className)}>
      {children}
    </div>
  )
}

export default Container