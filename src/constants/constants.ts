import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";

interface ServiceItem {
  backgroundImage: string;
}

export const ServiceData: ServiceItem[] = [
  { backgroundImage: image1.src },
  { backgroundImage: image2.src },
  { backgroundImage: image3.src },
  { backgroundImage: image4.src },
  { backgroundImage: image5.src },
  { backgroundImage: image6.src },
  { backgroundImage: image7.src },
  { backgroundImage: image8.src },
  { backgroundImage: image9.src },
  { backgroundImage: image10.src },
];
