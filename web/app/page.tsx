import LogoBanner from "@/lib/startpage/Banner";
import { fancyBackground, fancyBackgroundBlur, homepageStyles } from "./styles";
import JoinCodeInput from "@/lib/startpage/JoinCodeInput";

export default function Home() {
  return (
    <div className={homepageStyles}>
      <div className={fancyBackground}>
        <div className={fancyBackgroundBlur} />
      </div>
      <LogoBanner />
      <JoinCodeInput />
    </div>
  );
}
