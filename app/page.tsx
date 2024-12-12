import HeroSection from "@/app/components/HeroSection";
import NavBar from "@/app/components/NavBar";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import {Experience} from "@/app/components/Experience";
import Heading from "@/app/components/Heading";
import {Projects} from "@/app/components/Projects";
import RedirectToDashboard from "@/app/components/redirectToDashboard";

export default async function Home() {


    return (
        <>
            <div className={'fixed right-2 bottom-2'}>
                <RedirectToDashboard/>
            </div>
            <section
                className="border-b border-black/10 dark:border-white/10 sticky top-0 text-black dark:text-white z-[999]">
                <NavBar/>
            </section>
            <section id={"#hero"}>
                <MaxWidthWrapper>
                    <HeroSection/>
                </MaxWidthWrapper>
            </section>
            <section id="experience" className={''}>
                <MaxWidthWrapper>
                    <div className={''}>
                        <Heading text={'Experience'} id={'Experience'}/>
                    </div>
                    <Experience/>
                </MaxWidthWrapper>
            </section>
            <section id="projects">
                <MaxWidthWrapper>
                    <div>
                        <Heading text={'Projects'} id={'Projects'}/>
                    </div>
                    <Projects/>
                </MaxWidthWrapper>
            </section>
            <section id="skills">
                <MaxWidthWrapper>
                    <div>
                        <Heading text={'Skills'} id={'Skills'}/>
                    </div>
                    {/* Add Skills Content */}
                </MaxWidthWrapper>
            </section>
            <section id="contact">
                <MaxWidthWrapper>
                    <div>
                        <Heading text={'Contact'} id={'Contact'}/>
                    </div>
                    {/* Add Contact Content */}
                </MaxWidthWrapper>
            </section>
        </>
    );
}
