import {IoMdPin} from "react-icons/io";

const HeroSection = () => {
    return (
        <section className={'min-h-[50vh] flex items-start justify-center flex-col px-4'}>
            {/* Location */}
            <div className={'flex items-center justify-start space-x-2'}>
                <IoMdPin className="text-2xl"/> {/* Icon size adjusted */}
                <p className={'text-2xl'}>India</p>
            </div>

            {/* Main Heading */}
            <h1 className={'text-3xl sm:text-6xl md:text-7xl font-bold'}>
                Hello, I'm <span className={'text-primary'}>Syed Adeeb</span>.
            </h1>

            {/* Subheading */}
            <p className={'mt-1 text-3xl sm:text-4xl text-secondary'}>Full Stack Developer</p>
        </section>
    );
}

export default HeroSection;
