import React from 'react';
import styled from 'styled-components/native';

interface FormInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  multiline?: boolean; // <- Adiciona aqui
  numberOfLines?: number; // <- Útil para inputs grandes
  style?: object; // <- Permite passar estilo extra (como altura)
}

const Input = styled.TextInput`
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 12px 16px;
  margin-bottom: 12px;
  font-family: 'Montserrat-Regular';
  border-radius: 6px;
`;

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  editable = true,
  multiline = false, // <- Valor padrão
  numberOfLines,
  style,
}: FormInputProps) {
  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secureTextEntry}
      editable={editable}
      autoCapitalize="none"
      autoCorrect={false}
      multiline={multiline} // <- Passa aqui
      numberOfLines={numberOfLines} // <- Aqui também
      style={style} // <- Para altura customizada, etc.
    />
  );
}