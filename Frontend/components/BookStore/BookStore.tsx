import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; 
import { RouteType } from '../Navigation';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { API_BACKEND, BOOK_API_KEY } from '../../API_Backends/Api_backend';

type BookIdProps = {
    route: RouteProp<RouteType, 'BookStore'>;
};

interface BookType {
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail: string;
        };
        previewLink?: string;
    };
    saleInfo: {
        listPrice?: {
            amount: number;
        }
    };
    id: string;
}

const BookStore: React.FC<BookIdProps> = ({ route }) => {
    const { bookId } = route.params; 
    const [bookIds, setBookIds] = useState<string[]>([]); 
    const [bookData, setBookData] = useState<BookType | null>(null); 

    
    useEffect(() => {
        const fetchBookIds = async () => {
            try {
                const response = await axios.get(`${API_BACKEND}/api/book/all`);
                const fetchedBookIds = response.data.book; 
                setBookIds(fetchedBookIds); 
                console.log("Fetched Book IDs: ", fetchedBookIds,);
            } catch (error) {
                console.log("Error fetching book IDs:", error);
                
            }
        };

        fetchBookIds();
    }, []); 

    useEffect(() => {
       

        const fetchBookData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${BOOK_API_KEY}`);
                setBookData(response.data); 
                // console.log("Fetched book data: ", response.data);
            } catch (error) {
                console.log("Error fetching book data:", error);
            }
        };

      
        fetchBookData();
    }, []); 

    return (
        <View style={styles.container}>
            {bookIds.length > 0 ? (
                bookIds.map((item:any) => (
                    <View key={item._id}>
                        <Text style={{ color: "white" }}>Book ID: {item.bookId}</Text>
                    </View>
                ))
            ) : (
                <Text style={{ color: "white" }}>No book IDs available</Text>
            )}

            {bookData ? (
                <View>
                    {bookData.volumeInfo.imageLinks?.thumbnail ? (
                        <Image
                            source={{ uri: bookData.volumeInfo.imageLinks.thumbnail }}
                            style={styles.image}
                        />
                    ) : (
                        <Text style={{ color: "white" }}>No image available</Text>
                    )}

                    {/* <Text style={styles.title}>{bookData.volumeInfo.title}</Text>
                    <Text style={styles.author}>
                        {bookData.volumeInfo.authors?.join(', ')}
                    </Text>
                    <Text style={styles.price}>
                        {bookData.saleInfo.listPrice ? `$${bookData.saleInfo.listPrice.amount}` : 'Price not available'}
                    </Text> */}
                </View>
            ) : (
                <Text style={{ color: 'white' }}>Loading book data...</Text>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a0933",
        flex: 1,
        padding: 20,
    },
    image: {
        width: 150,
        height: 200,
        resizeMode: 'cover', 
        marginBottom: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    author: {
        color: 'white',
        fontSize: 18,
        marginVertical: 10,
    },
    price: {
        color: 'yellow',
        fontSize: 16,
    },
});

export default BookStore;
