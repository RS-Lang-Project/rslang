import { FC } from 'react';

const WaveForHeader: FC = () => (
  <div className="inner">
    <svg
      height="60px"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      overflow="hidden"
    >
      <path
        fill="#44337A"
        fillOpacity="1"
        d="M0,160L48,170.7C96,181,192,203,288,218.7C384,235,480,245,576,
        234.7C672,224,768,192,864,170.7C960,149,1056,139,1152,133.3C1248,
        128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,
        0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
  </div>
);

export default WaveForHeader;
