"use client";

import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import LogoClouds from '@/components/ui/LogoClouds';
import FeatureSection from '@/components/ui/feature';
import CTASection from '@/components/ui/cta';
import Footer from '@/components/ui/footer';
import FeatureImg from '@/components/ui/featuresIMG';
import FeaturesSec from '@/components/ui/featuresIMG';
import CatalogSection from '@/components/ui/CatalogSection';












export default function Home() {
  const [scrollPos, setScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollPos = window.pageYOffset;
      setVisible(scrollPos > currentScrollPos || currentScrollPos < 10);
      setScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  return (
    <div className="bg-white" >

      {/* Navegação */}
      <nav className={`fixed w-full bg-dark text-white transition-all duration-300 ${visible ? 'top-0 ' : '-top-20'} z-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0 gap-1">
              <a href="#">
                <Image src="/assets/planetaIcon.png" alt="Logo Icon" className="mr-2 " width={0} height={0} sizes="100vw" style={{ width: '35px', height: 'auto' }} />
              </a>
              <span className="font-bold text-xl "><a href="#">BENNY&apos;S</a></span>
            </div>
            <div className="hidden md:flex items-center"> 
              <div className="flex items-center">
                <Link href="#" className="block mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-white mr-4">Home</Link>
                <Link href="#objetivos" className="block mt-4 md:inline-block md:mt-0 text-gray-200 hover:text-white mr-4">About</Link>
                <Link href="/login">
                  <Button variant='outline' className="flex items-center gap-2 text-gray-800 hover:text-gray-500 mt-4 md:mt-0 transition-colors">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            {/* Botão de hambúrguer para telas menores */}
            <div className="md:hidden">
              <button type="button" className="block text-gray-200 hover:text-white focus:outline-none" onClick={() => setMobileMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>


      {/* Menu lateral de hambúrguer */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75" onClick={toggleMobileMenu} ></div>
          <div className="fixed inset-y-0 right-0 z-50 w-64 bg-gray-800" style={{ backgroundColor: '#2E2E2E' }}>
            <div className="p-5">
              <button className="block absolute top-4.5 right-6 text-white hover:text-gray-200 focus:outline-none" onClick={toggleMobileMenu}>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <a href="#" className="block mt-10 text-white hover:text-gray-200">Home</a>
              <a href="#" className="block mt-4 text-white hover:text-gray-200">About</a>
              <a href="/login" className="block mt-4 text-white hover:text-gray-200">Login</a>
            </div>
          </div>
        </div>
      )}


      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="overflow-hidden lg:py-20">
          <div className="container px-0 sm:px-0 lg:px-0 py-10 lg:py-16" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className='Titulo'>
                  <p className="text-center lg:text-left">Tudo num Só Local!</p>
                  {/* Title */}
                  <div className="mt-5">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center lg:text-left text-dark">
                      Exploração Automóvel
                    </h1>
                  </div>
                  {/* End Title */}
                  <div className="mt-5">
                    <p className="text-xl text-muted-foreground text-center lg:text-left">
                      Descobre o universo dos automóveis. Na Benny&apos;s,
                    </p>
                    <p className="text-xl text-muted-foreground text-center lg:text-left">
                      encontras tudo para os apaixonados por carros.
                    </p>
                  </div>
                  {/* Buttons */}
                  <div className="mt-8 flex justify-center lg:justify-start">
                    <Link href="/login">
                      <Button size={"lg"} className="bg-dark ">Começar Agora</Button>
                    </Link>
                  </div>
                </div>
                <div className="Imagem lg:w-1/2 mt-8 lg:mt-0">
                  <Image src="/assets/porsche3.jpg" alt="Description of the image" sizes="100vw" style={{ width: '100%', height: 'auto', }} width={500} height={500} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Seção de logos */}
      <section className="py-2">
        <LogoClouds></LogoClouds>
      </section>


      <section className="py-10" id="objetivos">
        <FeaturesSec></FeaturesSec>
      </section>

      {/* Seção de catalogo */}
      <section className="py-10">
        <CatalogSection></CatalogSection>
      </section>

      {/* Call-to-Action */}
      <section>
        <CTASection></CTASection>

      </section>

      {/* footer */}
      <section>
        <Footer></Footer>
      </section>

    </div>
  );
}

