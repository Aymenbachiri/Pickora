import { H2 } from "@/src/components/common/H2";
import { useSignInUser } from "@/src/lib/hooks/useSignInUser";
import { Link, type RelativePathString } from "expo-router";
import { Controller } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";

export default function SignIn() {
  const { control, errors, handleSubmit } = useSignInUser();

  return (
    <View className="flex-1 flex p-2 items-center justify-center dark:bg-black">
      <View className="flex flex-col w-full gap-3">
        <H2>Email</H2>
        <Controller
          control={control}
          name="emailAddress"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              autoCapitalize="none"
              value={value}
              placeholder="aymen.bachiri99@gmail.com"
              onChangeText={onChange}
              onBlur={onBlur}
              className="w-full dark:bg-white rounded-md p-2 border border-gray-300"
              style={{
                borderColor: errors.emailAddress ? "red" : "black",
                borderWidth: 1,
              }}
            />
          )}
        />
        {errors.emailAddress && (
          <Text className="text-red-500 text-sm">
            {errors.emailAddress.message}
          </Text>
        )}
      </View>
      <View className="flex flex-col w-full gap-3 mt-8">
        <H2>Password</H2>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
              className="w-full dark:bg-white rounded-md p-2 border border-gray-300"
              style={{
                borderColor: errors.password ? "red" : "black",
                borderWidth: 1,
              }}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 text-sm">
            {errors.password.message}
          </Text>
        )}
      </View>
      <View className="mt-8">
        <Button title="Sign In" onPress={handleSubmit} />
      </View>
      <View className="dark:text-white flex flex-row gap-4 mt-8">
        <Text className="dark:text-white">Don't have an account?</Text>
        <Link
          className="dark:text-white underline"
          href={"/(auth)/signup" as RelativePathString}
        >
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
