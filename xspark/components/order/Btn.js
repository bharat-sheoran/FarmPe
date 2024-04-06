import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Btn({ bgColor, textColor, btnLabel, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: 300,
        paddingVertical: 5,
        marginVertical: 15
      }}
    >
      <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 26 }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
