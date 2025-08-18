import HomeBanner from "./_home/HomeBanner";
import HomeCategory from "./_home/HomeCategory";
import OffetsCards from "./_home/OffetsCards";

export default function Home() {
  return (
    <div className="w-full top-padding">
      <HomeBanner />
      <OffetsCards />
      <HomeCategory />
    </div>
  );
}
