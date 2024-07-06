
import AcmeLogo from './ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/font';


export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
        </div>
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        <Image
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        /></div>
        <Image
          src="/hero-mobile.png"
          width={560}
          height={620}
          className="block md:hidden"
          alt="Screenshot of the dashboard project showing mobile version"
        />
      <Link
        href="/login"
        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
        <div className={styles.shape} />
          <strong>Welcome to Riverlyn LLC.</strong> Assets, Unclaimed Property, Audits, Compliance and Solutions{' '}
          <div><a href="https://riverlynllc.com" className="text-blue-500">
            Search For Your Assets!
          </a></div>
      <h3 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Developed and Hosted by Jamie Riverlyn.
      </h3>
    </main>
  );
}


