import React, { useState } from 'react';
import { Chip } from 'react-native-paper';
import { Image, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View, Text } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/AntDesign';

interface ProductItemProps {
    productCode: string;
    scanDate: Date;
    productName: string;
    productImage: string;
    productCategories: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({ productCode, scanDate, productName, productImage, productCategories }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const isNew = (new Date().getTime() - scanDate.getTime()) / (1000 * 60 * 60 * 24) < 7;

    const formattedDate = format(scanDate, 'dd.MM.yyyy');

    const categories = productCategories !== undefined && productCategories.length > 0 ? productCategories
                        .split(",") // .split(",", 5) to limit the number of tags
                        .map(category => category.trim()) : null;

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={[styles.card, styles.shadow]}>

            <Image
                source={productImage ? { uri: productImage } : require('../../assets/placeholder.png')}
                style={productImage ? styles.image : styles.placeholder}
            />
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    {/* To limit the Product Name to 3 lines 
                    <Text numberOfLines={isExpanded ? 3 : 1} style={styles.productName}>{productName}</Text>  */}
                    <Text numberOfLines={isExpanded ? undefined : 1} style={styles.productName}>{productName}</Text> 

                    {isNew && <Image source={require('../../assets/newTag.png')} style={styles.newTag}/>}

                    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
                        <Icon size={20} name={isExpanded ? "up" : "down"} style={styles.icon}/>
                    </TouchableOpacity>
                </View>  

                <Text style={styles.date}>{formattedDate}</Text>

                {isExpanded && (
                    <View style={styles.expandedSection}>
                        <View style={styles.tagsContainer}>
                            {categories?.map((category, index) => (
                                <Chip key={index} style={styles.tag} textStyle={styles.tagText}>{category}</Chip>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: '#F8F9FC',
        borderRadius: 10,
        borderWidth: 2,
        color: '#F8F9FC',
        flexDirection: "row",
        margin: 6,
        marginBottom: 12,
        marginHorizontal: 16,
    },
    shadow: {
        backgroundColor: '#F8F9FC',
        shadowColor: 'rgba(27, 38, 51, 0.25)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.25,
        shadowRadius: 3,

        // Android-specific shadow
        elevation: 5,
    },
    infoContainer: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 2,
        marginVertical: 8, 
    },
    textContainer: {
        alignItems: 'flex-start', 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: '98%', 
    },
    image: {
        height: 120,
        marginVertical: 8,
        resizeMode: 'contain',
        width: 120,
    },
    placeholder: {
        height: 50,
        margin: 30,
        resizeMode: 'contain',
        width: 50,
    },
    productName: {
        color: '#1B2633',
        fontSize: 20,
        fontWeight: 'bold',
        width: 152,
    },
    date: {
        color: '#1B2633',
        fontSize: 12,
        marginTop: 8,
    },
    newTag: {
        height: 26,
        marginRight: 12,
        resizeMode: 'contain',
        width: 53,
    },
    expandedSection: {
        marginBottom: 8,
        marginRight: 8,
        marginTop: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#D4E5FF',
        borderRadius: 48,
        marginBottom: 5,
        marginRight: 5,
    },
    tagText: {
        color: 'rgba(27, 38, 51, 1)',
        fontSize: 12,
        fontWeight: 400,
    },
    icon: {
        color: '#5E646E',
        position: 'absolute',
        right: 0,
        top: 4,
    },
});
