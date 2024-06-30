import Image from "next/image";
import Link from "./link";
import st from "@/styles/CardNavigator.module.css";

interface CardNavigatorProps {
  title: string;
  image?: string;
  link: string;
}

const CardNavigator = ({ title, image, link }: CardNavigatorProps) => {
  return (
    <li  className={st.card}>
      <Link href={link}>
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default CardNavigator;
