//CAN'T BE USED BEACUSE THIS DOESN'T NEED TO BE A PAGE


import { Link, useLoaderData } from "react-router-dom";
import CarouselCard from "../cards/carouselcards";

export default function CarouselLoaders () {
    const carousel = useLoaderData();

    return (
        <>
            {carousel.map(item => (
                <Link>
                    <CarouselCard key={item.id} imageUrl={item.message} title={`Dog ${item.id}`} />
                </Link>
            ))}
        </>
    );
};

export const theLoaders = async () => {
    const res = await fetch('http://localhost:3003/dog');
    return res.json;
};