import React, { Suspense } from "react";

// import CardSection from "../../components/CardSection";
// import DemoSection from "../../components/DemoSection";
// import FilterSection from "../../components/FilterSection";
import HeroSection from '../../components/HeroSection';

const DemoSection = React.lazy(() => import('../../components/DemoSection'));

function Home () {

	return (
		<>
			<HeroSection/>
			{/* <FilterSection/> */}
			<Suspense fallback={<div>Loading...</div>}>
				<DemoSection/>
			</Suspense>
			{/* <DemoSection/> */}
			{/* <CardSection /> */}
		</>
	)
};

export default Home;