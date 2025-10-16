import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies, updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");

  const { data: trendingMovies, loading: trendingLoading } = useFetch(
    () => getTrendingMovies(),
    true
  );
  const {
    data: movies,
    loading,
    error,
    refetch,
  } = useFetch(() => fetchMovies({ query: searchValue.toLowerCase() }), true);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 800);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.trim() && movies?.length > 0) {
      updateSearchCount(searchValue, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      {/* الخلفية */}
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      {/* المحتوى القابل للتمرير */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Image
          source={icons.logo}
          className="w-20 h-16 mt-20 mb-5 self-center"
          resizeMode="contain"
        />

        <View className="px-5">
          <SearchBar
            placeholder="Search for a movie"
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>

        {trendingMovies && searchValue.length < 1 && (
          <View className="mt-10 px-5">
            <Text className="text-lg text-white font-bold mb-3">
              Trending Movies
            </Text>
            <FlatList
              horizontal
              data={trendingMovies}
              keyExtractor={(item) => item.movie_id.toString()}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              contentContainerStyle={{ gap: 20 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <Text className="text-lg text-white font-bold px-5 mt-8 mb-3">
          {searchValue ? "Search Results" : "Latest Movies"}
        </Text>

        {loading ? (
          <View className="flex justify-center items-center py-10">
            <ActivityIndicator size="large" color="#00f" />
          </View>
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            numColumns={3}
            renderItem={({ item }) => <MovieCard {...item} />}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              marginBottom: 15,
              paddingHorizontal: 10,
            }}
            scrollEnabled={false} // ✅ خليها false عشان ScrollView هو اللي يتحكم في السحب
          />
        )}
      </ScrollView>
    </View>
  );
}
