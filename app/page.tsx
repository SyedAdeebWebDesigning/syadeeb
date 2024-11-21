import HeroSection from "@/app/components/HeroSection";
import NavBar from "@/app/components/NavBar";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

export default function Home() {
    return (
        <>
            <section className={'dotted-background'}>
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
