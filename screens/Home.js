import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

export default function SplashScreen({ navigation }) {
	return (
		<ImageBackground
			source={require('../assets/background.jpg')}
			resizeMode='cover'
			style={styles.image}>
			<TouchableOpacity
				onPress={() => navigation.navigate('List')}
				style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.title}>MAREK - Filtroo Test</Text>
					<Text style={styles.text}>Touch me to the next step...</Text>
				</View>
			</TouchableOpacity>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		backgroundColor: '#F7FCF8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#081c15',
		marginBottom: 5,
	},
	text: {
		fontSize: 16,
		color: '#081c15',
		marginBottom: 5,
	},
});
