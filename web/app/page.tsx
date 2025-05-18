import Text from "@/lib/components/Text";
import { homepageStyles } from "./styles";

export default function Home() {
  return (
    <div className={homepageStyles}>
      <Text size="xxl" weight={600}>Musicguessr</Text>
    </div>
  );
}
