import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'; 
import axios from 'axios';
import { API_BACKEND, BOOK_API_KEY } from '../../API_Backends/Api_backend';
import Footer from '../Footer/Footer';

interface BookType {
    volumeInfo: {
        title: string;
        imageLinks?: {
            thumbnail: string;
        };
    };
    id: string;
}

const BookStore: React.FC = () => {
    const [bookIds, setBookIds] = useState<{ _id: string; bookId: string }[]>([]); 
    const [bookData, setBookData] = useState<BookType[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookIds = async () => {
            try {
                const response = await axios.get(`${API_BACKEND}/api/book/all`);
                setBookIds(response.data.book);
            } catch (error) {
                console.log("Error fetching book IDs:", error);
            }
        };

        fetchBookIds();
    }, []);

    useEffect(() => {
        const fetchBookData = async () => {
            if (bookIds.length > 0) {
                try {
                    const bookPromises = bookIds.map(async (bookId) => {
                        const response = await axios.get(
                            `https://www.googleapis.com/books/v1/volumes/${bookId.bookId}?key=${BOOK_API_KEY}`
                        );
                        return response.data;
                    });
                    const books = await Promise.all(bookPromises);
                    setBookData(books);
                } catch (error) {
                    console.log("Error fetching book data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBookData();
    }, [bookIds]);


    return (<>
        <ScrollView style={styles.container}>
          <View style={styles.booksContainer}>
            {loading ? (
                 <Text style={{ color: 'white' }}>Loading book data...</Text>
            ) :(
                bookData.length > 0 ? (
                    bookData.map((book, index) => (
                        <View key={index} style={styles.bookItem}>
                            {book.volumeInfo.imageLinks?.thumbnail ? (
                                <Image
                                    source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                                    style={styles.image}
                                />
                            ) : (
                                <Text style={styles.noImage}>No image available</Text>
                            )}
                            <Text style={styles.title}>{book.volumeInfo.title}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: "white" }}>No book data available</Text>
                )
            )}
          </View>
        </ScrollView>
        <Footer/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a0933",
        flex: 1,
        padding: 20,
    },
    booksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bookItem: {
        marginBottom: 20,
        width: '45%',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 180,
        resizeMode: 'cover', 
        marginBottom: 10,
        borderRadius: 5,
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    noImage: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default BookStore;
