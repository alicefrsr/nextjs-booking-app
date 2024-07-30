import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';

import { getCabin, getCabins } from '@/app/_lib/data-service';

import { Suspense } from 'react';

// export const metadata = {
//   title: 'Cabin',
// };
// dynamic instead
export async function generateMetadata({ params }) {
  console.log(params);
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  // fetching multiple pieces of data from one component: blocking waterfall
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin;

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400 '>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
          <DateSelector />
          <ReservationForm />
        </div> */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
