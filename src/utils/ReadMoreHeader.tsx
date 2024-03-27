import { useState } from "react";

interface Props {
    children: any;
}
export const ReadMore = ({ children }: Props) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(false);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <h5 className="text-read-more">
            {isReadMore ? text.slice(0, 100) : text}
            {text.length > 100 && (<span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "var(--bs-primary)" }}
            >
                {isReadMore ? " >>" : " <<"}
            </span>)}
        </h5>
    );
};