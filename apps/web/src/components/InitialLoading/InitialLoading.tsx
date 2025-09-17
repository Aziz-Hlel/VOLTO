import { useEffect, useState } from "react";

const InitialLoading = () => {
    const [showLoader, setShowLoader] = useState(true);

    const img1 = "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3emVldTd4ZGRyZ3I5amRycGtvNG9qZXBjYjN5Y3c2dW5tMWl3Mnh0MyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/tbh3GLiYSgYYE/giphy.gif"
    const img2 = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1tdTI1NTlobnU3bHE3czI4NjRndDYwcWZlNmsxOXVwdmp2b2pmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wpVM8uZMwThC0/giphy.gif"

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000000);

        return () => clearTimeout(timer); // Cleanup
    }, []);

    if (!showLoader) return null;

    return (
        <div>
            <CutoutTextLoader
                height="450px"
                background="white"
                imgUrl={img1}
            />
        </div>
    );
};

const CutoutTextLoader = ({
    height,
    background,
    imgUrl,
}: { height: string; background: string; imgUrl: string }) => {
    return (
        <div className="relative min-h-screen" >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />
            <div
                style={{ background }}
                className="absolute inset-0 animate-pulse z-10"
            />
            <span
                className="font-black absolute flex items-center justify-center min-h-screen inset-0 z-50 text-center bg-clip-text text-transparent pointer-events-none"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    fontSize: "clamp(3rem, 12vw, 10rem)",
                }}
            >
                Loading...
            </span>
        </div>
    );
};

export default InitialLoading;
