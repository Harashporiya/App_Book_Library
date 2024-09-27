import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteType } from '../Navigation';
import { RouteProp } from '@react-navigation/native';
type BookIdProps = {
    route: RouteProp<RouteType, 'BookStore'>;
};
const BookStore: React.FC<BookIdProps> = ({ route }) => {
    const { bookId } = route.params;
    return (
        <View>
           <Text>{bookId}</Text>
        </View>
    )
}
export default BookStore;