import {StyleSheet} from 'react-native';

export const colors = {
  purple: {
    100: "#B6C2FF",
    200: "#758BFD",
    300: "#6881FF",
  },
  gray: {
    50: "#CBCBCB",
    100: "#929292",
    200: "#2D2D2D",
  },
  red: {
    100: "#E53E3E",
  },
  WHITE: "#fff",
  BLACK: "#000",
  ALTO: "#dfdfdf",
  GREY: "#808080",
  EBONY_CLAY: "#292d3e",
  HEATHER: "#bfc7d5",
  LYNCH: "#697098",
  SHARK: "#242526",
  SHUTTLE_GREY: "#565E67",
};

export const globalStyles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})