import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import {
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ProtectedScreen } from "../lib/helpers/ProtectedScreen";
import { H2 } from "../components/common/H2";
import { useSellProduct } from "../lib/hooks/useSellProduct";
import { AntDesign } from "@expo/vector-icons";
import { Toaster } from "sonner-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useColorScheme } from "nativewind";

export default function SellProduct() {
  const { control, errors, handleSubmit, loading } = useSellProduct();
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const { colorScheme } = useColorScheme();

  const handleSubmitWithLogging = () => {
    console.log(`Submission attempt #${submissionAttempts + 1}`);
    setSubmissionAttempts((prev) => prev + 1);

    if (Object.keys(errors).length > 0) {
      console.error("Form errors before submission:", errors);

      Alert.alert(
        "Form Validation Errors",
        Object.entries(errors)
          .map(([field, error]) => `${field}: ${error.message}`)
          .join("\n")
      );
      return;
    }

    handleSubmit();
  };

  return (
    <ProtectedScreen>
      <Toaster position="bottom-center" />
      <ScrollView className="flex-1 bg-white p-4 dark:bg-black">
        <MyView className="flex flex-col gap-4 justify-center items-center">
          {/* Title */}
          <MyView className="flex w-full flex-col gap-2">
            <H2>Title</H2>
            <Controller
              control={control}
              name="title"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  className="border rounded-md w-full p-2 dark:bg-white"
                  placeholder="Enter product title"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    borderColor: error ? "red" : "black",
                    borderWidth: 1,
                  }}
                />
              )}
            />
            {errors.title && (
              <MyText className="text-red-600">{errors.title.message}</MyText>
            )}
          </MyView>

          {/* Description */}
          <MyView className="flex w-full flex-col gap-2">
            <H2>Description</H2>
            <Controller
              control={control}
              name="description"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  className="border rounded-md w-full p-2 dark:bg-white"
                  multiline
                  numberOfLines={4}
                  placeholder="Enter product description"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    borderColor: error ? "red" : "black",
                    borderWidth: 1,
                  }}
                />
              )}
            />
            {errors.description && (
              <MyText className="text-red-600">
                {errors.description.message}
              </MyText>
            )}
          </MyView>

          {/* Category */}
          <MyView className="flex w-full flex-col gap-2">
            <H2>Category</H2>
            <MyView className="dark:bg-white">
              <Controller
                control={control}
                name="category"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    style={{
                      borderColor: error ? "red" : "black",
                      borderWidth: 1,
                    }}
                  >
                    <Picker.Item label="Select a category" value="" />
                    <Picker.Item label="Electronics" value="electronics" />
                    <Picker.Item label="Men" value="men" />
                    <Picker.Item label="Women" value="women" />
                    <Picker.Item label="Jewelery" value="jewelery" />
                  </Picker>
                )}
              />
            </MyView>
            {errors.category && (
              <MyText className="text-red-600">
                {errors.category.message}
              </MyText>
            )}
          </MyView>

          {/* Price */}
          <MyView className="flex w-full flex-col gap-2">
            <H2>Price</H2>
            <Controller
              control={control}
              name="price"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  className="border rounded-md w-full p-2 dark:bg-white"
                  keyboardType="decimal-pad"
                  placeholder="Enter price"
                  value={value?.toString() || ""}
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  onBlur={onBlur}
                  style={{
                    borderColor: error ? "red" : "black",
                    borderWidth: 1,
                  }}
                />
              )}
            />
            {errors.price && (
              <MyText className="text-red-600">{errors.price.message}</MyText>
            )}
          </MyView>

          {/* Image URL */}
          <MyView className="flex w-full flex-col gap-2">
            <H2>Image URL</H2>
            <Controller
              control={control}
              name="imageUrl"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  className="border rounded-md w-full p-2 h-10 dark:bg-white"
                  placeholder="Enter image URL"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    borderColor: error ? "red" : "black",
                    borderWidth: 1,
                  }}
                />
              )}
            />
            {errors.imageUrl && (
              <MyText className="text-red-600">
                {errors.imageUrl.message}
              </MyText>
            )}
          </MyView>

          <Button
            title="Submit"
            onPress={handleSubmitWithLogging}
            disabled={loading}
          />

          <TouchableOpacity onPress={handleSubmitWithLogging}>
            {loading && (
              <AntDesign
                className="animate-spin"
                name="loading1"
                size={24}
                color="black"
              />
            )}
            <H2>Submit</H2>
          </TouchableOpacity>
        </MyView>
      </ScrollView>
    </ProtectedScreen>
  );
}
