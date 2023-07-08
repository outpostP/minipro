import CarouselReal from "../carousel/carousel"

import ArticleList from "../content/categoriestest"


export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center">
      <h1 className="text-center">LATEST POST</h1>
      <div className="w-2/5">
      <CarouselReal />
      </div>
    </div>
      <ArticleList/>
      </>
  )
}
