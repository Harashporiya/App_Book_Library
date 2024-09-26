import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { BOOK_API_KEY } from '../../API_Backends/Api_backend';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteType } from '../Navigation';

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
    const [latestBook, setLatestBook] = useState<BookType[]>([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation<NavigationProp<RouteType>>();

    const bookId = (id: string) => {
        console.log(id);
        navigation.navigate("bookId",{bookId:id})
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}+All&key=${BOOK_API_KEY}`);
                setBookData(response.data.items);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [search]);

    useEffect(() => {
        const fetchDataLatestBook = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=newest&key=${BOOK_API_KEY}`);
                setLatestBook(response.data.items);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchDataLatestBook();
    }, []);

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

            <ScrollView>
                <Text style={{color:"white", fontSize:20, padding:10}}>Newest Book</Text>
                <ScrollView horizontal style={styles.horizontalScrollView}>
                    {latestBook.map((book: BookType) => (
                        <TouchableOpacity key={book.id} onPress={() => bookId(book.id)}>
                            <View style={styles.horizontalBookContainer}>
                                <Image
                                    source={{ uri: book.volumeInfo.imageLinks?.thumbnail }}
                                    style={styles.horizontalBookImage}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View>
                    <Text style={{color:"white", fontSize:20, padding:10}}>All Book</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.verticalScrollView}>
                        {bookData.map((book: BookType) => (
                            <TouchableOpacity key={book.id} onPress={() => bookId(book.id)}>
                                <View style={styles.verticalBookContainer}>
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
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
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
        flex:1,
    },
    verticalBookContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    verticalBookImage: {
        width: 120,
        height: 180,
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
