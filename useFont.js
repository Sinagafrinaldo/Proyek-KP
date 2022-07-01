import * as Font from 'expo-font';
const useFonts = async () =>
    await Font.loadAsync({
        poppins: require('./src/poppins/Poppins-Regular.ttf'),
        poppinsbold: require('./src/poppins/Poppins-Bold.ttf'),
        poppinslight: require('./src/poppins/Poppins-Light.ttf'),
        poppinssemibold: require('./src/poppins/Poppins-SemiBold.ttf'),
        poppinsmedium: require('./src/poppins/Poppins-Medium.ttf'),
        poppinsblack: require('./src/poppins/Poppins-Black.ttf'),
    });

export default useFonts