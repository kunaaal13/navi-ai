import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

function Welcome() {
  return (
    <SafeAreaView className="flex-1 justify-around items-center bg-black w-full">
      <View
        className="gap-y-10"
        style={{
          width: '90%',
        }}>
        <Text
          className="text-white text-5xl font-bold text-center"
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

      <View className="flex-row justify-center">
        <LottieView
          autoPlay
          style={{
            width: 250,
            height: 250,
          }}
          source={require('../assets/robot.json')}
        />
      </View>

      <View
        style={{
          width: '90%',
        }}>
        <Link href="/chat" asChild>
          <TouchableOpacity className="bg-blue-700 p-4 rounded-xl items-center w-full">
            <Text
              className="text-white text-2xl font-semibold"
              style={{
                fontFamily: 'Geist-SemiBold',
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;
