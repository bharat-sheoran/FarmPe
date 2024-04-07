import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function YieldCalculator({ navigation }) {
    const [area, setArea] = useState('');
    const [density, setDensity] = useState('');
    const [efficiency, setEfficiency] = useState('');
    const [yieldProduction, setYieldProduction] = useState(null);

    const calculateYieldProduction = () => {
        const areaValue = parseFloat(area);
        const densityValue = parseFloat(density);
        const efficiencyValue = parseFloat(efficiency);

        if (!isNaN(areaValue) && !isNaN(densityValue) && !isNaN(efficiencyValue)) {
            const result = areaValue * densityValue * efficiencyValue;
            setYieldProduction(result.toFixed(2));
        } else {
            setYieldProduction(null);
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Farm Area (square meters)"
                keyboardType="numeric"
                value={area}
                onChangeText={text => setArea(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Planting Density (plants per square meter)"
                keyboardType="numeric"
                value={density}
                onChangeText={text => setDensity(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Harvest Efficiency (0-1)"
                keyboardType="numeric"
                value={efficiency}
                onChangeText={text => setEfficiency(text)}
            />
            <Button title="Calculate Yield Production" onPress={calculateYieldProduction} />
            {yieldProduction !== null && (
                <Text style={styles.result}>Yield production: {yieldProduction}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '80%',
        height: 40,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
    },
});