import React, { useState, useEffect, useCallback } from 'react';
import ListItem from '../components/ListItem/ListItem';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { StatusBar } from 'expo-status-bar';

export default function List({ navigation }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const loadNewPage = () => {
		setCurrentPage((prevState) => prevState + 1);
	};

	const fetchImage = useCallback(async () => {
		try {
			setIsRefreshing(true);
			const response = await fetch(
				`https://picsum.photos/v2/list?page=${currentPage}&limit=5`
			);
			const data = await response.json();
			setData((prevData) => [...prevData, ...data]);
			setLoading(false);
			setIsRefreshing(false);
		} catch {
			(error) => setError(error);
			setLoading(false);
			setError(true);
		}
	}, [currentPage]);

	useEffect(() => {
		fetchImage();
	}, [fetchImage]);

	const handleRefresh = useCallback(() => {
		if (!loading && !isRefreshing) {
			setData([]);
			setCurrentPage(1);
			fetchImage();
		}
	}, [fetchImage, isRefreshing, loading]);

	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorMessage refresh={fetchImage}>
					We can't load the list of the elements
				</ErrorMessage>
			) : (
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<ListItem item={item} navigation={navigation} />
					)}
					keyExtractor={(item) => item.id}
					onEndReached={loadNewPage}
					onEndReachedThreshold={0.5}
					onRefresh={handleRefresh}
					refreshing={isRefreshing || loading}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		marginTop: StatusBar.currentHeight,
		paddingVertical: 20,
		backgroundColor: '#F7FCF8',
		alignItems: 'center',
	},
});
