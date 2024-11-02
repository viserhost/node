'use client';

import '@/public/css/home_page.css';
import Navbar from './_partials/Navbar';
import useReferral from './_hooks/useReferral';
import Laramin from './_partials/_sections/laramin';
import Features from './_partials/_sections/features';
import AboutUs from './_partials/_sections/about-us';

export default function Home() {
  const { setReferral } = useReferral();
  setReferral();
 

  return (
    <>
      <section className='page-wrapper'>
        <div className="container">
          <Navbar />
          <Laramin />
        </div>
      </section>
    </>
  );
}
