import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type TextSliceProps = SliceComponentProps<Content.TextSliceSlice>;

const TextSlice: FC<TextSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col gap-4 leading-relaxed text-ink"
    >
      {slice.primary.title && <h2>{slice.primary.title}</h2>}
      <PrismicRichText field={slice.primary.text} />
    </section>
  );
};

export default TextSlice;
