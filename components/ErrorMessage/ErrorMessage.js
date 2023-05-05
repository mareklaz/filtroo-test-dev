import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function ErrorMessage({ children, refresh }) {
	return (
		<View style={[styles.container, styles.horizontal]}>
			<Image
				style={styles.icon}
				source={require('../../assets/cancelar.png')}
			/>
			<Text style={styles.text}>Oops, something went wrong</Text>
			<Text style={styles.textSmall}>{children}</Text>
			<Button title='Refresh' onPress={() => refresh()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	horizontal: {
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 10,
	},
	text: {
		marginBottom: 5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	textSmall: {
		fontSize: 14,
	},
	icon: {
		width: 150,
		height: 150,
		margin: 20,
	},
	button: {
		padding: 10,
		margin: 10,
	},
});
