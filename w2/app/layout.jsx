import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Index, { SuduxuFooter, SuduxuNavbar } from '../components/Website'
import { GridBackgroundDemo } from "@/components/ui/grid-background";
import { Spotlight } from "@/components/ui/spotlight-new"; 
import BackgroundProvider from '@/components/custom/BackgroundProvider'
import '@/styles/globals.css';

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
 
const footer = <SuduxuFooter />
const navbar = <SuduxuNavbar />
const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="de"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body className='x:bg-nextra-bg'>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          darkMode={false}
          editLink={""}
          feedback={{
            content: <></>,
            labels: ""
          }}
          // ... Your additional layout options
        >
          <BackgroundProvider />
          <div className='w-full h-full relative'>
            {children}
          </div>
        </Layout>
      </body>
    </html>
  )
}