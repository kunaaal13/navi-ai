import LottieView from 'lottie-react-native';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

function Welcome() {
  return (
    <SafeAreaView className="bg-black flex-1 items-center justify-between w-full">
      <View className="flex-1 items-center justify-between w-4/5 py-10">
        <View className="items-center justify-center gap-5 mt-10">
          <Text
            className="text-white text-5xl font-bold"
            style={{
              fontFamily: 'Geist-Bold',
            }}>
            Navi AI
          </Text>
          <Text
            className="text-white text-2xl font-semibold text-center tracking-wider"
            style={{
              fontFamily: 'Geist-SemiBold',
            }}>
            Chat like a friend, learn like an expert.
          </Text>
        </View>

        <LottieView
          autoPlay
          style={{
            width: 250,
            height: 250,
          }}
          source={require('../assets/robot.json')}
        />

        <TouchableOpacity className="bg-blue-700 p-4 rounded-xl items-center w-full">
          <Text
            className="text-white text-2xl font-semibold"
            style={{
              fontFamily: 'Geist-SemiBold',
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;
