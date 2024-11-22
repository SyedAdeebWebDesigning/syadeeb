import HeroSection from "@/app/components/HeroSection";
import NavBar from "@/app/components/NavBar";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

export default function Home() {
    return (
        <>
            <section className={'border-b border-white/10 sticky top-0 bg-background z-10'}>
                <NavBar/>
            </section>
            <section className={'dotted-background'}>
                <MaxWidthWrapper>

                    <HeroSection/>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
