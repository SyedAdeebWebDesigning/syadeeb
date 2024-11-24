import {TextHoverEffect} from "@/app/components/ui/text-hover-effect";

type Props = {
    text: string;
    id?: string;
};
const Heading = ({text, id}: Props) => {
    return (
        <TextHoverEffect text={text} id={id}/>
    );
};
export default Heading;
