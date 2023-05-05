import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

export default function ListItem({ item, navigation }) {
	const { author, download_url, id } = item;

	return (
		<View style={styles.item}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Detail', { id: id })}>
				<ImageBackground style={styles.image} source={{ uri: download_url }}>
					<Text style={styles.author}>
						{author} ({id})
					</Text>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		height: 200,
		flex: 1,
		marginHorizontal: 5,
		marginBottom: 10,
	},
	author: {
		padding: 5,
		backgroundColor: '#BFEBC6',
		textAlign: 'center',
		fontSize: 14,
		color: '#081c15',
	},
	image: {
		width: 200,
		height: 200,
	},
});
