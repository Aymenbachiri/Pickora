import { MyText } from "@/src/components/common/MyText";
import { MyView } from "@/src/components/common/MyView";
import { TextInput, Button, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ProtectedScreen } from "../lib/helpers/ProtectedScreen";
import { H2 } from "../components/common/H2";
import { useSellProduct } from "../lib/hooks/useSellProduct";
import { Controller } from "react-hook-form";

export default function SellProduct() {
  const { control, errors, handleSubmit, loading } = useSellProduct();

  return (
    <ProtectedScreen>
      <ScrollView className="flex-1 bg-white p-4 dark:bg-black">
        <MyView className="flex flex-col gap-4 justify-center items-center">
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
          <Button title="Submit" onPress={handleSubmit} disabled={loading} />
        </MyView>
      </ScrollView>
    </ProtectedScreen>
  );
}
