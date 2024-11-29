import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LightThemeContext } from "../../config/contexts";

/**
 * This functional component renders a circular progress indicator centered inside a flexbox container.
 *
 * @returns A Box component containing a CircularProgress component.
 */
export default function CircularIndeterminate() {
  const lightTheme = useContext(LightThemeContext);
  const itemColor = lightTheme ? "#6D86FB" : "#BA51F9";

  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={70} sx={{ color: itemColor }} />
    </Box>
  );
}