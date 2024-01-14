import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

export const PROFILE = () => {
    const [profile, setProfile] = useState({
        PNUM: "",
        Name: "",
        eml: ""
    });

    const { PNUM, Name, eml } = profile;

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? '2%' : 0 }}>
            <View style={{ flex: 1 }}>
                <View>
                    <TextInput
                        label="Enter Your Phone Number"
                        value={PNUM}
                        keyboardType="phone-pad"
                        onChangeText={Pnumber => setProfile({ ...profile, PNUM: Pnumber })}
                        mode='outlined'
                        style={{ marginVertical: '4%' }}
                    />

                    <TextInput
                        label="Enter Your Name"
                        value={Name}
                        onChangeText={name => setProfile({ ...profile, Name: name })}
                        mode='outlined'
                        style={{ marginVertical: '4%' }}
                    />

                    <TextInput
                        label="Enter Your Email"
                        value={eml}
                        onChangeText={email => setProfile({ ...profile, eml: email })}
                        mode='outlined'
                        style={{ marginVertical: '4%' }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
