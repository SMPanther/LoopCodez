import Image from "next/image";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden>
      <Image
        src="/loopcodez-logo.jpeg"
        alt=""
        width={72}
        height={72}
        sizes="72px"
        className="brand-mark__image"
      />
    </span>
  );
}
