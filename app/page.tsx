import HeroSection from "@/app/components/HeroSection";
import NavBar from "@/app/components/NavBar";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import {TextHoverEffect} from "@/app/components/ui/text-hover-effect";

export default function Home() {
    return (
        <>
            <section className={'border-b border-white/10 sticky top-0 bg-background z-10'}>
                <NavBar/>
            </section>
            <section className={''}>
                <MaxWidthWrapper>

                    <HeroSection/>
                </MaxWidthWrapper>
            </section>
            <section id={'experience'}>
                <MaxWidthWrapper>

                    <div className={''}>
                        <TextHoverEffect text="Experience"/>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
