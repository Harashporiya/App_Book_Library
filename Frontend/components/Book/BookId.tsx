import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BOOK_API_KEY } from '../../API_Backends/Api_backend';
import { RouteType } from '../Navigation';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


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

type BookIdProps = {
    route: RouteProp<RouteType, 'bookId'>;
};

const BookId: React.FC<BookIdProps> = ({ route }) => {
    const [bookData, setBookData] = useState<BookType | null>(null);
    const { bookId } = route.params;
    const navigation = useNavigation<NavigationProp<RouteType>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${BOOK_API_KEY}`);
                setBookData(response.data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [bookId]);

    const handlePreviewPress = () => {
        if (bookData?.volumeInfo.previewLink) {
            Linking.openURL(bookData.volumeInfo.previewLink);
        }
    };

    if (!bookData) {
        return (
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 20 }}>Loading...</Text>
            </View>
        );
    }
    const amount = bookData.saleInfo?.listPrice?.amount;
    const ratingCountFromAmount = (amount: number | undefined) => {
        if (amount !== undefined) {
            if (amount > 900) return 10;
            if (amount > 800) return 9;
            if (amount > 700) return 8;
            if (amount > 600) return 7;
            if (amount > 500) return 6;
            if (amount > 400) return 5;
            if (amount > 300) return 4;
            if (amount > 200) return 3;
            if (amount > 100) return 2;
            return 1;
        }
        return 0;
    };
    const rating = ratingCountFromAmount(amount);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Entypo name="cross" size={34} color="white" onPress={() => navigation.navigate("Book")} />
                <AntDesign name="shoppingcart" size={34} color="white" />
            </View>
            <View style={styles.cardContainer}>
                <Image
                    source={{ uri: bookData.volumeInfo.imageLinks?.thumbnail }}
                    style={styles.image}
                />
                <Text style={styles.title}>{bookData.volumeInfo.title}</Text>

                {bookData.volumeInfo.authors && (
                    <Text style={styles.authors}>Authors: {bookData.volumeInfo.authors.join(', ')}</Text>
                )}
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name="star" size={24} color="gold" />
                    <Text style={styles.title}>({rating}) </Text>
                    <Text style={styles.title}>{bookData.saleInfo.listPrice?.amount}</Text>
                </View>
                <View style={styles.button}>
                    <View>
                        <Text style={styles.free}>Free</Text>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: "#f98b60", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                        onPress={handlePreviewPress}
                    >
                        <Text style={styles.freePreview}>Free Preview</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1a0933",
    },
    cardContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    image: {
        width: 200,
        height: 250,
        marginBottom: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "white",
    },
    authors: {
        fontSize: 16,
        marginTop: 10,
        color: "white",
    },
    button: {
        flexDirection: "row",
        margin: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderRadius: 20,
    },
    freePreview: {
        width: 140,
        color: "white",
        marginHorizontal: 10,
        fontSize: 20,
        padding: 10,
        textAlign: "center",
    },
    free: {
        width: 120,
        color: 'black',
        marginHorizontal: 10,
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    }
});

export default BookId;
