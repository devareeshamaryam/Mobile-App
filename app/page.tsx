 import Layout from './components/Layout';
import LatestMobilesSection from './components/LatestMobilesSection';
import PriceAbove50kSection from './components/PriceAbove50kSection';
import Price40to50kSection from './components/Price40to50kSection';
import DiscoverMoreResponsive from './components/Discovermoreresponsive';
import Price30to40kSection from './components/Price30to40kSection';
import Price20to30kSection from './components/Price20to30kSection';
import Price10to20kSection from './components/Price10to20kSection';
import {
  latestMobiles,
  above50kMobiles,
  between40to50k,
  between30to40k,
  between20to30k,
  between10to20k,
} from '@/data/mobilesData';
 
export default function Home() {
  return (
   <>
          {/* Latest Mobiles */}
          <LatestMobilesSection mobiles={latestMobiles} />

          {/* Above 50k */}
          <PriceAbove50kSection mobiles={above50kMobiles} />

          {/* 40k - 50k */}
          <Price40to50kSection mobiles={between40to50k} />

          <DiscoverMoreResponsive />

          {/* 30k - 40k */}
          <Price30to40kSection mobiles={between30to40k} />

          {/* 20k - 30k */}
          <Price20to30kSection mobiles={between20to30k} />

          {/* 10k - 20k */}
          <Price10to20kSection mobiles={between10to20k} />
</>
   );
}