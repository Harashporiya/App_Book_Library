import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RouteType } from '../Navigation';


type BookIdProps = {
    route: RouteProp<RouteType, 'bookId'>; 
};

const BookId: React.FC<BookIdProps> = ({ route }) => {
    const { bookId } = route.params;
    

    return (
        <View>
            <Text>Book ID: {bookId}</Text>
        </View>
    );
};

export default BookId;
