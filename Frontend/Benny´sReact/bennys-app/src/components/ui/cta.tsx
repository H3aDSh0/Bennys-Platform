export default function CTASection() {

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-dark rounded-3xl px-6 py-8 shadow-2xl">
                    <div className="mx-auto max-w-md text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-3xl">
                            Encontre o seu carro de sonho.
                        </h2>
                        <p className="mt-4 text-base text-gray-300">
                        Descubra a nossa plataforma e simplifique o processo de compra e venda de automóveis.
                                                </p>
                        <div className="mt-8 flex justify-center items-center">
                            <a
                                href="/login"
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Entrar
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
