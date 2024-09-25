import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face{
        font-family: 'PTS';
        src:url('/src/assets/PTSansNarrow-Regular.ttf') format('truetype');
    } `}
  />
);

export default Fonts;
