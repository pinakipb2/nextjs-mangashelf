import type { NextPage, InferGetStaticPropsType } from 'next';
import Footer from '../../components/footer';
import Header from '../../components/header';
import MangaCard from '../../components/mangaCards/completed';
import SEO from '../../components/seo';
import { getPaginatedMangas } from '../../lib/dbquery';
import { activeRoute, Manga } from '../../lib/types';

export async function getStaticProps() {
  // Reutrn page 'a'(page) with 'b'(limit) records each page
  const page: number = 10;
  const limit: number = 2;
  const skip: number = (page - 1) * limit;
  const mangas: Manga[] = await getPaginatedMangas(skip, limit);
  return {
    props: {
      mangas,
    },
    revalidate: 10,
  };
}

const Completed: NextPage<{ mangas: Manga[] }> = ({ mangas }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO title="Completed Mangas" />
      <Header current={activeRoute.completed} />
      <div className="bg-neutral-700 pb-10">
        <div className="mx-64 mt-0 items-center justify-center flex flex-row">
          <div className="flex justify-center">
            <div className="mb-10 xl:w-96">
              {/* <input
                type="search"
                className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white shadow-lg"
                placeholder="Search Manga..."
              /> */}
            </div>
          </div>
        </div>
        {mangas.length > 0 ? (
          <MangaCard mangas={mangas} />
        ) : (
          <div className="mx-64 items-center justify-center flex flex-col text-3xl text-white mt-32 mb-32">Oops! Nothing on your Completed List.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Completed;
