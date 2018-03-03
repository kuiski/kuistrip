import * as colors from "material-ui/colors";

export const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "80px repeat(7, 40px)",
    gridAutoRows: "40px",
    gridGap: "0",
    maxWidth: "30em",
    margin: 0,
    padding: 0,
    fontSize: ".1em"
  },
  weekday: {
    display: "flex",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  month: {
    display: "flex",
    margin: 0,
    padding: 0,
    justifyContent: "right",
    alignItems: "center",
    fontSize: ".2em",
    fontWeight: "bold"
  },
  days: {
    display: "flex",
    margin: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  monthColor: month => {
    return {
      ...styles.days,
      backgroundColor: month % 2 === 0 ? colors.pink[50] : colors.blue[50]
    };
  },
  selector: (color, textColor = "white") => {
    if (!color) return {};

    return {
      color: textColor,
      backgroundColor: color,
      borderRadius: "50% 50% 50% 50%",
      width: "60%",
      height: "60%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
  }
};
