import {TextHoverEffect} from "@/app/components/ui/text-hover-effect";

type Props = {
    text: string;
};
const Heading = ({text}: Props) => {
    return (
        <TextHoverEffect text={text}/>
    );
};
export default Heading;
