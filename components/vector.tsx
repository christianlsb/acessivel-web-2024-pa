import Image from "next/image";
import vector from "@/assets/img/svg/Vector.svg";

interface VectorBlueProps {
  className?: string;
}

const VectorBlue = ({ className }: VectorBlueProps) => {
  return (
    <div className={className}>
      <Image src={vector} width={1920} height={200} alt="Vetor azul" />
    </div>
  );
};

export default VectorBlue;
