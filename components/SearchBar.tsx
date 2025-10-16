import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}
const SearchBar = ({ placeholder, value, onChangeText }: props) => {
  return (
    <View className="flex flex-row items-center bg-dark-200 rounded-lg px-5">
      <Image
        source={icons.search}
        className="size-5 "
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        placeholder={placeholder}
        className="flex-1 ml-2 text-white"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
      />
    </View>
  );
};

export default SearchBar;
