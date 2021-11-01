import React, {useCallback, useMemo, memo} from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';

const MyItem = ({parent, onPress, categorySelectable, selectable, item, custom, label, value, selectedItemContainerStyle, isSelected, containerStyle, listItemContainerStyle}) => {

    /**
     * The selected item label style.
     * @returns {object}
     */
     const _selectedItemContainerStyle = useMemo(() => isSelected && selectedItemContainerStyle, [isSelected, selectedItemContainerStyle]);

    /**
     * The list item container style.
     * @returns {object}
     */
     const _listItemContainerStyle = useMemo(() => ([
        ...[listItemContainerStyle].flat(),
        ...[_selectedItemContainerStyle].flat(),
        ...[containerStyle].flat(),
    ]), [_selectedItemContainerStyle, listItemContainerStyle, containerStyle]);
    
    const __onPress = useCallback(() => {
        if(parent === null && ! categorySelectable && selectable !== true) {
            return;
        }

        onPress(item, custom);
    }, [onPress, parent, categorySelectable, custom]);

    return (
        <Pressable style={_listItemContainerStyle} onPress={__onPress}>
            <Text>{label}</Text>
            <Text>{value}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})

export default memo(MyItem);