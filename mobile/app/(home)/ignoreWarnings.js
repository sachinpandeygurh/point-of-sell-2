import { LogBox } from "react-native";
const ignoreWarnings =()=>{
  
if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const originalConsoleWarn = console.warn;

  console.warn = (...args) => {
    const [firstArg] = args;

    if (ignoreWarns.some((warning) => firstArg.startsWith(warning))) {
      return;
    }

    originalConsoleWarn(...args);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

}
export default ignoreWarnings