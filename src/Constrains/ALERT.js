import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Text, Portal, Button } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo'
export const ALERT = ({ visible, hidevisible }) => {
    console.log("Alert", visible)
    const hideDialog = () => hidevisible(false);
    return (
        <Portal>
            <Dialog visible={visible.bull} onDismiss={hideDialog} >
                {visible.icon ? (
                    <Dialog.Icon icon={visible.icon} />
                ) : (
                    <Dialog.Icon icon="alert"/>
                )}
                <Dialog.Title style={styles.title}>{visible.msg}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{visible.des}</Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
})


