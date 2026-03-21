import Image from 'next/image';

const FeaturesSec = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Grid */}
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
        <div>
          <Image
            className="rounded-xl"
            src="/assets/teste.png"
            alt="Image Description"
            width={800}
            height={600}
          />
        </div>
        {/* End Col */}

        <div className="mt-5 sm:mt-10 lg:mt-0">
          <div className="space-y-6 sm:space-y-8">
            {/* Title */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-bold text-3xl lg:text-4xl text-dark dark:text-neutral-200">
                Objetivos do Projeto
              </h2>
              <p className="text-gray-500 dark:text-neutral-500">
              Criamos um Marketplace Online com ênfase na aplicação web, permitindo gerir veículos, utilizadores e transações. 
              </p>
              <p className="text-gray-500 dark:text-neutral-500">
              Incluímos recursos como listagem de veículos, aluguer mensal, pesquisa avançada, histórico de veículos e login com diferentes acessos.
              </p>
            </div>
            {/* End Title */}

            {/* List */}
            <ul className="space-y-2 sm:space-y-4">
              <li className="flex space-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-dark text-white">
                  <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>

                <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                  Desenvolvimento de um <span className="font-bold">Marketplace Online.</span>
                </span>
              </li>

              <li className="flex space-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-dark text-white">
                  <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>

                <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                Criação de uma <span className="font-bold">interface de administração web.</span>
                </span>
              </li>

              <li className="flex space-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-dark text-white">
                  <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>

                <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                  <span className="font-bold">Listagem e venda</span> de veículos novos.
                </span>
              </li>

              <li className="flex space-x-3">
                <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-dark text-white">
                  <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>

                <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                <span className="font-bold">Facilitação da pesquisa</span> de carros por compradores.
                </span>
              </li>
            </ul>
            {/* End List */}
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
    //End Features
  );
};

export default FeaturesSec;
