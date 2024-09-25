import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput } from 'react-native';
import { BOOK_API_KEY } from '../../API_Backends/Api_backend';
import FontAwesome from '@expo/vector-icons/FontAwesome';


interface BookType {
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
    id: string;
}

const ShowBook = () => {
    const [bookData, setBookData] = useState<BookType[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}+Any&key=${BOOK_API_KEY}`);
                setBookData(response.data.items);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [search]);

    return (
        <View style={styles.container}>
            <View style={styles.logoTextContainer}>
                <View style={styles.logoText}>
                    <Text style={styles.logo}>B</Text>
                    <View style={styles.circleO} />
                    <View style={styles.circleO} />
                    <Text style={styles.logo}>KLY</Text>
                </View>
                <View style={styles.searchContainer}>
                    <FontAwesome name="search" size={24} color="white" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search books..."
                        placeholderTextColor="#cccccc"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
                {bookData.map((book: BookType) => (
                    <View key={book.id} style={styles.horizontalBookContainer}>
                        <Image
                            source={{ uri: book.volumeInfo.imageLinks?.thumbnail }}
                            style={styles.horizontalBookImage}
                        />
                    </View>
                ))}
            </ScrollView>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.verticalScrollView}>
                {bookData.map((book: BookType) => (
                    <View key={book.id} style={styles.verticalBookContainer}>
                        <Image
                            source={{ uri: book.volumeInfo.imageLinks?.thumbnail }}
                            style={styles.verticalBookImage}
                        />
                        <View style={styles.bookDetails}>
                            <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
                            <Text style={styles.bookAuthor}>
                                by {book.volumeInfo.authors?.join(', ')}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a0933",
        flex: 1,
    },
    logoTextContainer: {
        flexDirection: 'column',
        padding: 10,
    },
    logoText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 5,
    },
    circleO: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'white',
        marginHorizontal: -5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a1a43',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: 'white',
    },
    horizontalScrollView: {
        marginBottom: 20,
    },
    horizontalBookContainer: {
        width: 120,
        marginRight: 10,
    },
    horizontalBookImage: {
        width: 120,
        height: 180,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    verticalScrollView: {
        flex: 1,
    },
    verticalBookContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2a1a43',
    },
    verticalBookImage: {
        width: 80,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    bookDetails: {
        marginLeft: 10,
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#cccccc',
        marginTop: 5,
    },
});

export default ShowBook;