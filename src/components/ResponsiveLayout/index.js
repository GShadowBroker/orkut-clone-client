import { useWindowDimensions } from "./WindowDimensionsProvider";

const ResponsiveLayout = ({ breakpoint, renderMobile, renderDesktop }) => {
  const { width } = useWindowDimensions();
  return width > breakpoint ? renderDesktop() : renderMobile();
};

export default ResponsiveLayout;
