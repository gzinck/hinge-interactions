import BgImage from "../util/BgImage";
import Screen from "../util/Screen";
import img from "./screenshots/bg.jpg";
import Touchbar from './Touchbar';

function TouchbarScreen() {
  return (
    <Screen>
      <BgImage src={img} draggable={false} />
      <Touchbar />
    </Screen>
  );
}

export default TouchbarScreen;
