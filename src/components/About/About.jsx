import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="pt-10 h-full overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">

        
          <div>
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              Hey 👋 I am
              <br className="block sm:hidden" />
            <h1 className='mt-2'>  Aman Raj</h1> 
            </h2>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
            Aman Raj is not only an exceptional developer with a deep understanding of technology and problem-solving skills, but he is also a wonderful friend who always offers support, kindness, and positivity. 
            His dedication to his work and his friendly nature make him both a great colleague and an amazing companion to have around.
            </p>

            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                <span className="relative">Have a question?</span>
              </span>
              <br className="block sm:hidden" />
              Ask me on{' '}
              <Link
                href="#"
                title="Twitter"
                className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"
              >
                Twitter
              </Link>
            </p>
          </div>

        </div>
      </div>
     
    </section>
  );
};

export default About;
