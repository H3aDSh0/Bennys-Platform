import Link from 'next/link';
import Image from 'next/image'; // Importe o componente de imagem do Next.js
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';


const CarCatalog = () => {
  const cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'GR Supra',
      price: '$50,000',
      seats: 2,
      transmission: 'Automático',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car1.png',
    },
    {
      id: 2,
      brand: 'Lamborghini',
      model: 'Huracan',
      price: '$200,000',
      seats: 2,
      transmission: 'Automático',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car3.png',
    },
    {
      id: 3,
      brand: 'Honda',
      model: 'Civic Type R',
      price: '$38,000',
      seats: 4,
      transmission: 'Manual',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car4.avif',
    },
    {
      id: 4,
      brand: 'Audi',
      model: 'RS6',
      price: '$110,000',
      seats: 5,
      transmission: 'Automático',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car7.avif',
    },
    {
      id: 5,
      brand: 'Ferrari',
      model: 'SF90 Stradale',
      price: '$625,000',
      seats: 2,
      transmission: 'Automático',
      fuelType: 'Gasolina/Híbrido',
      segmento: 'Supercarro',
      image: '/assets/car9.avif',
    },
    {
      id: 6,
      brand: 'Porsche',
      model: '718 Cayman GT4',
      price: '$100,000',
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car11.png',
    },
    {
      id: 7,
      brand: 'Nissan',
      model: '370Z Nismo',
      price: '$46,000',
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car12.png',
    },
    {
      id: 8,
      brand: 'BMW',
      model: 'M4',
      price: '$71,000',
      seats: 4,
      transmission: 'Automático',
      fuelType: 'Gasolina',
      segmento: 'Desportivo',
      image: '/assets/car13.png',
    }


  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-dark">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-4">Catálogo de Carros</h1>
      <p className="text-lg text-gray-600 text-center mb-8">Confira nossa seleção dos melhores carros disponíveis.</p>
      <div className="grid grid-cols-1  gap-6">
        {cars.map((car) => (
          <Link key={car.id} href="/login">
          <Card key={car.id} className="card">
            <CardHeader>
              <CardTitle>{car.brand} {car.model}</CardTitle>
              <CardDescription>{car.segmento}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center p-5 card-image-container" style={{ height: '150px' }}>
                  <Image src={car.image} alt={`${car.brand} ${car.model}`} width={400} height={400} className="object-contain rounded-lg" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex space-x-2 items-center text-sm">
                <div className="flex items-center space-x-1">
                  <img src="/assets/seat.png" alt="Ícone de lugares" className="w-5 h-5" />
                  <p>{car.seats}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <img src="/assets/gearbox.png" alt="Ícone de transmissão" className="w-5 h-5" />
                  <p>{car.transmission}</p>
                </div>
              </div>
              <p className="text-lg font-bold">{car.price}</p>
            </CardFooter>
          </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/login">
          <Button className="flex items-center gap-2 text-gray-100 hover:text-gray-300 mt-4 md:mt-0 transition-colors">
            Ver Mais
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};


export default CarCatalog;
