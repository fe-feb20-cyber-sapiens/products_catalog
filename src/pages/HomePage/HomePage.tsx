import { Categories } from '../../components/Categories/Categories';
import { HomeSlider } from '../../components/HomeSlider/HomeSlider';
import { SecondarySlider } from '../../components/SecondarySlider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-page__title">
        Welcome to nice gadgets store!
      </h1>

      <HomeSlider />

      <div className="home-page__slider">
        <SecondarySlider
          endpoint="new"
          title="Brand new models"
        />
      </div>

      <Categories />

      <div className="home-page__slider">
        <SecondarySlider
          endpoint="discount"
          title="Hot prices"
        />
      </div>
    </div>
  );
};