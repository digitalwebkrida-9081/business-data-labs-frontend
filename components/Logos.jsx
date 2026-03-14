import Image from "next/image";
export default function Logos() {
  return (
    <section className="py-12 bg-white flex justify-center items-center">
      <Image
        src="/images/mid-image.avif"
        alt="Image"
        width={580}
        height={350}
        className="mx-auto"
      />
    </section>
  );
}
