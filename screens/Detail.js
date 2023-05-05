import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	Image,
	StyleSheet,
	Text,
	Modal,
	Button,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

export default function Detail({ navigation, route }) {
	const { id } = route.params;

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const fetchImage = useCallback(async () => {
		try {
			const response = await fetch(`https://picsum.photos/id/${id}/info`);
			const data = await response.json();
			setData(data);
			setLoading(false);
		} catch {
			(error) => setError(error);
			setLoading(false);
			setError(true);
		}
	}, []);

	useEffect(() => {
		fetchImage();
	}, [fetchImage]);

	const handleRefresh = () => {
		setError(false);
		setLoading(true);
		fetchImage();
		setLoading(false);
	};

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const { author, download_url } = data;

	return loading ? (
		<Spinner />
	) : error ? (
		<ErrorMessage refresh={handleRefresh}>
			We can't load information about this profile.
		</ErrorMessage>
	) : (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={toggleModal}>
				<Image style={styles.image} source={{ uri: download_url }}></Image>
			</TouchableOpacity>
			<Text style={styles.author}>{author}</Text>
			<Modal
				visible={showModal}
				animationType='slide'
				onRequestClose={toggleModal}>
				<View style={styles.modalView}>
					<Image
						resizeMode='cover'
						style={styles.modalImage}
						source={{ uri: download_url }}
					/>
					<Button title='Cerrar' onPress={toggleModal} />
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10,
		backgroundColor: '#F7FCF8',
		alignItems: 'center',
	},
	image: {
		width: 300,
		height: 300,
	},
	modalImage: { width: '100%', height: '75%', marginBottom: 10 },
	modalView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	author: {
		marginVertical: 10,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
