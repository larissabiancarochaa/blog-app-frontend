import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: #10a3b9;
  padding: 14px;
  border-radius: 6px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-family: 'Montserrat-Bold';
  font-size: 16px;
`;

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <Button onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}
