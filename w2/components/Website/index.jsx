"use client"

import { Navbar } from 'nextra-theme-docs'
import { ThemeSelection } from '../custom/ThemeSelection'

export const SuduxuNavbar = () => {
  
  return (
    <Navbar logo={<img src="/img/Logo.png" className='w-14 h-14' />} >
    </Navbar>
  )
}
export const SuduxuFooter = () => {
  return (
    <div className="relative z-50 x:bg-gray-100 x:pb-[env(safe-area-inset-bottom)] x:dark:bg-neutral-900 x:print:bg-transparent">
      <hr className="nextra-border" />
      <footer className="x:mx-auto x:flex x:max-w-(--nextra-content-width) x:justify-center x:py-12 x:text-gray-600 x:dark:text-gray-400 x:md:justify-start x:pl-[max(env(safe-area-inset-left),1.5rem)] x:pr-[max(env(safe-area-inset-right),1.5rem)]">
        <span className='text-sm'>©{new Date().getFullYear()} Entrepreneurship Education. All rights reserved.</span>
      </footer>
    </div>
  );
}