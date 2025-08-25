import CouponProducts from "./_home/CouponProducts";
import HomeBanner from "./_home/HomeBanner";
import HomeCategory from "./_home/HomeCategory";
import HomeOffersProducts from "./_home/HomeOffersProducts";
import OffetsCards from "./_home/OffetsCards";
import Products from "./_home/Products";

export default function Home() {
  return (
    <div className="w-full top-padding">
      <HomeBanner />
      <OffetsCards />
      <HomeCategory />
      <Products />
      <HomeOffersProducts />
      <CouponProducts />
    </div>
  );
}
