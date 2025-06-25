import LogoBanner from "@/lib/startpage/Banner";
import { fancyBackground, fancyBackgroundBlur, fancyBackgroundBlur2, homepageStyles } from "./styles";
import JoinCodeInput from "@/lib/startpage/JoinCodeInput";

export default function Home() {
  return (
    <div className={homepageStyles}>
      <div className={fancyBackground}>
        <div className={fancyBackgroundBlur} />
        <div className={fancyBackgroundBlur2} />
      </div>
      <LogoBanner />
      <JoinCodeInput />
    </div>
  );
}
