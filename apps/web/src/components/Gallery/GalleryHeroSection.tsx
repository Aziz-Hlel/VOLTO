import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Link } from "react-router-dom";


const GalleryHeroSection = () => {

    const images = [
        "/img/galleryImgsBanner/1.jpg",
        "/img/galleryImgsBanner/2.jpg",
        "/img/galleryImgsBanner/3.jpg",
        "/img/galleryImgsBanner/4.jpg",
        "/img/galleryImgsBanner/5.jpg",
        "/img/galleryImgsBanner/6.jpg",
        "/img/galleryImgsBanner/7.jpg",
        "/img/galleryImgsBanner/8.jpg",
        "/img/galleryImgsBanner/9.jpg",
        "/img/galleryImgsBanner/10.jpg",
        "/img/galleryImgsBanner/11.jpg",
        "/img/galleryImgsBanner/12.jpg",
        "/img/galleryImgsBanner/13.jpg",
        "/img/galleryImgsBanner/14.jpg",
        "/img/galleryImgsBanner/15.jpg",
        "/img/galleryImgsBanner/16.jpg",
        "/img/galleryImgsBanner/17.jpg",
        "/img/galleryImgsBanner/18.jpg",
        "/img/galleryImgsBanner/19.jpg",
        "/img/galleryImgsBanner/20.jpg",
        "/img/galleryImgsBanner/21.jpg",
        "/img/galleryImgsBanner/22.jpg",
        "/img/galleryImgsBanner/23.jpg",
        "/img/galleryImgsBanner/24.jpg",
        "/img/galleryImgsBanner/25.jpg",
        "/img/galleryImgsBanner/26.jpg",
        "/img/galleryImgsBanner/27.jpg",
        "/img/galleryImgsBanner/28.jpg",
        "/img/galleryImgsBanner/29.jpg",
        "/img/galleryImgsBanner/30.jpg",
        "/img/galleryImgsBanner/31.jpg",
    ]

    // const voltoImageGalleryReplicas = Array.from({ length: voltoImageGallery.length }).flatMap(() => images);


    function shuffleArray<T>(array: T[]): T[] {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // 1. Repeat array 4 times
    const repeated = Array.from({ length: 4 }).flatMap(() => images);

    // 2. Shuffle
    const voltoImageGalleryReplicas = shuffleArray(repeated);

    return (
        <div className="relative mx-auto  flex md:h-screen h-96 w-full  flex-col items-center justify-center overflow-hidden rounded-none">
            <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
                Live{" "} a
                <span className="relative z-20 inline-block rounded-none bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
                    bold
                </span>{" "}
                moment
                <div>

                    Frame it forever.
                </div>
            </h2>
            <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
                A glimpse into nights that lit the room and hearts that filled it.
                Scroll through stories told in laughter, music, and timeless snapshots.

            </p>

            <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link to="/reservation" className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
                    Make a reservation
                </Link>
                <Link to="/events" className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
                    Browse Events
                </Link>
            </div>

            {/* overlay */}
            <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
            <ThreeDMarquee
                className="pointer-events-none absolute inset-0 h-full w-full my-0 mx-0 "
                images={voltoImageGalleryReplicas}
            />
        </div>
    );


}

export default GalleryHeroSection