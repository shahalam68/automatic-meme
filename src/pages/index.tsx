import ActiveSlider from "@/components/ActiveSlider";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import HomeSlider from "@/components/HomeSlider";
import ShopNow from "@/components/ShopNow";

export default function Home() {
  return (
    <main className="font-inter">
     <HomeSlider/>
     <Featured/>
     <ShopNow/>
    </main>
  );
}
