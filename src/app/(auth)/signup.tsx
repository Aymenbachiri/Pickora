import { Link, type RelativePathString } from "expo-router";
import { Button, TextInput, View, Text } from "react-native";
import { H2 } from "@/src/components/common/H2";
import { Controller } from "react-hook-form";
import { useSignUpUser } from "@/src/lib/hooks/useSignUpUser";

export default function SignUp() {
  const {
    pendingVerification,
    code,
    setCode,
    onPressVerify,
    control,
    errors,
    handleSubmit,
  } = useSignUpUser();

  return (
    <View className="flex-1 bg-white gap-3 dark:bg-black px-6 py-10">
      {!pendingVerification && (
        <>
          <View className="bg-white flex flex-col mt-8 gap-3 dark:bg-black">
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

          <View className="bg-white flex flex-col mt-8 gap-3 dark:bg-black">
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
                    borderColor: errors.emailAddress ? "red" : "black",
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

          {errors.root && (
            <Text className="text-red-500 text-sm">{errors.root.message}</Text>
          )}

          <View className="mt-4">
            <Button title="Sign Up" onPress={handleSubmit} />
          </View>

          <View className="dark:text-white flex flex-row gap-4 mt-8">
            <Text className="dark:text-white">Alredy Have an account?</Text>
            <Link
              className="dark:text-white underline"
              href={"/(auth)/signin" as RelativePathString}
            >
              <Text>Sign in</Text>
            </Link>
          </View>
        </>
      )}

      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
            className="w-full dark:bg-white rounded-md p-2"
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
}
