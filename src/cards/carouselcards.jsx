function CarouselCard({ imageUrl, title, fitImage = false }) {
  const imageStyle = fitImage ? "object-contain" : "w-full";

  return (
    <div className="rounded border border-black shadow-lg box-border w-max-300">
      <img  className={`${imageStyle} h-[200px] w-[300px]`} src={`https://minpro-blog.purwadhikabootcamp.com/${imageUrl}`} alt="Card" />
      <div className="px-6 py-4 border-t border-black">
        <div className="font-bold text-xl mb-2 box-border">{title}</div>
      </div>
    </div>
  );
}

export default CarouselCard;
