import React from 'react';
import Banner from '../banner/banner';
import TopScholarship from '../TopScholarship.JSX';
import RecentlyAddedScholarships from '../RecentlyAddedScholarships';
import PopularScholarships from '../PopularScholarships';


const Home = () => {
    return (
        <div>
         <Banner/> 
         <TopScholarship/>
         <RecentlyAddedScholarships/>
         <PopularScholarships/>
        </div>
    );
};

export default Home;