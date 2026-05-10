import React from 'react';

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const SearchBar = ({
    search,
    setSearch,
    categories,
    selectedCategory,
    onSelectCategory,
}: any) => {
    return (
        <View>

            {/* Search Input */}
            <TextInput
                placeholder="Search products..."
                value={search}
                onChangeText={setSearch}
                style={styles.input}
                placeholderTextColor="#999"
            />

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 5
                }}>

                {categories.map(
                    (category: string) => {
                        const isSelected =
                            selectedCategory === category;

                        return (
                            <TouchableOpacity
                                key={category}
                                activeOpacity={0.8}
                                onPress={() =>
                                    onSelectCategory(category)
                                }
                                style={[
                                    styles.categoryChip,
                                    isSelected &&
                                    styles.selectedChip,
                                ]}>

                                <Text
                                    style={[
                                        styles.categoryText,
                                        isSelected &&
                                        styles.selectedText,
                                    ]}>

                                    {category}
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                )}
            </ScrollView>

        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    input: {
        height: 52,

        backgroundColor: '#fff',

        borderRadius: 14,

        paddingHorizontal: 16,

        fontSize: 15,
        color: '#111',

        borderWidth: 1,
        borderColor: '#EEE',
        marginTop: 10
    },

    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,

        borderRadius: 20,

        backgroundColor: '#fff',

        marginRight: 10,

        borderWidth: 1,
        borderColor: '#EEE',
    },

    selectedChip: {
        backgroundColor: '#111',
        borderColor: '#111',
    },

    categoryText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
        textTransform: 'capitalize',
    },

    selectedText: {
        color: '#fff',
    },
});