import { useEffect, useState } from "react";

const backgrounds = [
  "/polar-bg.jpg",
  "/close_up_high_detail_macro_photography_of_crystalline_blue_glacier_ice..png",
  "/a_vibrant_shimmering_aurora_borealis_in_shades_of_emerald_green_and_violet.png",
  "/a_vast_shimmering_glacier_valley_between_dark_jagged_peaks_under_a_clear.png",
  "/a_cozy_glowing_research_station_nestled_at_the_foot_of_a_massive_snowy_mountain.png",
  "/a_breathtaking_wide_angle_shot_of_a_sharp_snow_covered_mountain_peak_reflected.png",
  "/aerial_view_of_an_arctic_coastline_where_white_snow_covered_land_meets_deep.png",
];

export default function BackgroundSlideshow({ className = "app-background" }) {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % backgrounds.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      key={backgroundIndex}
      className={className}
      style={{ backgroundImage: `url('${backgrounds[backgroundIndex]}')` }}
      aria-hidden="true"
    />
  );
}
